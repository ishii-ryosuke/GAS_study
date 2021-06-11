function doGet(e) {
  let template = HtmlService.createTemplateFromFile('test5/task_manage_app');
  return template.evaluate();
}

// タスク一覧を取得
function getTaskList() {
  let taskManageSpreadSheet = SpreadsheetApp.openById('1tHxL9btVtP7LJWmBqbIyXa3-pxCG3kpOA5aWQFkKfaY');
  let taskSheet = taskManageSpreadSheet.getSheetByName('タスク一覧');
  let taskList = taskSheet.getDataRange().getValues();
  return taskList;
}

// 「タスク一覧」シートを取得
function getTaskSheet() {
  let taskManageSpreadSheet = SpreadsheetApp.openById('1tHxL9btVtP7LJWmBqbIyXa3-pxCG3kpOA5aWQFkKfaY');
  let taskSheet = taskManageSpreadSheet.getSheetByName('タスク一覧');
  return taskSheet;
}

// ソートしたタスク一覧をクライアント側に送信
function getTaskToWebApp() {
  return getSortTaskList(getTaskList());
}

// ソートしたタスク一覧を取得
function getSortTaskList(taskList) {
  // ステータス「完了」のタスクを取り除く
  taskList = taskList.filter(function(task) {
    return task[2] != '完了';
  });
  // タスクをソートする
  taskSort(taskList);
  taskDateFormat(taskList);
  return taskList;
}

// タスク一覧をソートする関数
function taskSort(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = array.length - 1; i < j; j--) {
      // ますは日付をチェックする
      if (taskDateCheck(array[j], array[j - 1])) {
        let tmp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = tmp;
      } 
    }
  }
}

 // 配列で後ろのタスクの日付が、前のタスクより古かった場合、trueを返す（入れ替える）
function taskDateCheck(taskBack, taskFront) {
  let taskBackDate = taskBack[3].getTime();
  let taskFrontDate = taskFront[3].getTime();
  if(taskBackDate < taskFrontDate) {
    return true;
  } else if (taskBackDate === taskFrontDate) {
    // 日付が同じ場合、ステータスをチェックする
    return taskStatusCheck(taskBack, taskFront);
  }
  return false;
}

// 後ろのタスクのステータスが「仕掛中」で、前のタスクが「未着手」の場合、trueを返す（入れ替える）
function taskStatusCheck(taskBack, taskFront) {
  if(taskBack[2] === '仕掛中' && taskFront[2] === '未着手') {
    return true;
  } else if (taskBack[2] === taskFront[2]) {
    // ステータスが同じ場合、No.をチェックする
    return taskIndexCheck(taskBack, taskFront);
  }
  return false;
}

// 後ろのタスクのNo.の方が、前のタスクより番号が若かった場合、trueを返す（入れ替える）
function taskIndexCheck(taskBack, taskFront) {
  if (taskBack[0] < taskFront[0]) {
    return true;
  }
  return false;
}

// 日付のフォーマット
function taskDateFormat(array) {
  for (let i = 1; i < array.length; i++) {
    let str = array[i][3].getFullYear()
    + '/' + ('0' + (array[i][3].getMonth() + 1)).slice(-2)
    + '/' + ('0' + array[i][3].getDate()).slice(-2);
    array[i][3] = str;
  }
}

// 画面で入力されたタスクをスプレッドシートに記録する
function setTaskFromWebApp(taskContents, taskDeadline) {
  let taskList = getTaskList(); 
  let newTask = [taskList[taskList.length - 1][0] + 1, taskContents, '未着手', taskDeadline];
  getTaskSheet().getRange(`A${taskList.length + 1}:D${taskList.length + 1}`).setValues([newTask]);
  return getSortTaskList(getTaskList());
}

// 指定したタスクのステータスを変更する
function setTaskStatus(taskListIndexFromWebApp, taskStatus) {
  let taskList = getSortTaskList(getTaskList()); 
  let taskListIndex = taskList[taskListIndexFromWebApp][0];
  getTaskSheet().getRange(`C${taskListIndex + 1}`).setValue(taskStatus);
  return getSortTaskList(getTaskList());
}
