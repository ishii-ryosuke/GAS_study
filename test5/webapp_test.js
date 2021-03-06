function doGet(e) {
  const template = HtmlService.createTemplateFromFile('test5/task_manage_app');
  return template.evaluate();
}

/**
 * タスク一覧を取得
 * @return {number[][]} タスク一覧の二次元配列
 */ 
function getTaskList() {
  return getTaskSheet().getDataRange().getValues();;
}

/**
 * 「タスク一覧」シートを取得
 * @return {Sheet} タスク一覧のシート
 */ 
function getTaskSheet() {
  const taskManageSpreadSheet = SpreadsheetApp.openById('1tHxL9btVtP7LJWmBqbIyXa3-pxCG3kpOA5aWQFkKfaY');
  const taskSheet = taskManageSpreadSheet.getSheetByName('タスク一覧');
  return taskSheet;
}

/**
 * ソートしたタスク一覧をクライアント側に送信
 * @return {number[][]} ソートされたタスク一覧の二次元配列
 */ 
function getTaskToWebApp() {
  return getSortTaskList(getTaskList());
}

/**
 * ソートしたタスク一覧を取得
 * @param {number[][]} taskList - ソートされていないタスク一覧の二次元配列
 * @return {number[][]} ソートされたタスク一覧の二次元配列
 */ 
function getSortTaskList(taskList) {
  // ステータス「完了」のタスクを取り除く
  taskList = taskList.filter(function(task) {
    return task[2] !== '完了';
  });
  // タスクをソートする
  taskSort(taskList);
  taskDateFormat(taskList);
  return taskList;
}

/**
 * タスク一覧をソートする関数
 * @param {number[][]} array - ソートされていないタスク一覧の二次元配列
 */ 
function taskSort(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = array.length - 1; i < j; j--) {
      // ますは日付をチェックする
      if (taskDateCheck(array[j], array[j - 1])) {
        const tmp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = tmp;
      } 
    }
  }
}

 /**
 * 配列で後ろのタスクの日付が、前のタスクより古かった場合、trueを返す（入れ替える）
 * @param {number[]} taskBack - 後ろのタスクが格納されている配列
 * @param {number[]} taskFront - 前のタスクが格納されている配列
 */ 
function taskDateCheck(taskBack, taskFront) {
  const taskBackDate = taskBack[3].getTime();
  const taskFrontDate = taskFront[3].getTime();
  if(taskBackDate < taskFrontDate) {
    return true;
  } else if (taskBackDate === taskFrontDate) {
    // 日付が同じ場合、ステータスをチェックする
    return taskStatusCheck(taskBack, taskFront);
  }
  return false;
}

 /**
 * 後ろのタスクのステータスが「仕掛中」で、前のタスクが「未着手」の場合、trueを返す（入れ替える）
 * @param {number[]} taskBack - 後ろのタスクが格納されている配列
 * @param {number[]} taskFront - 前のタスクが格納されている配列
 */ 
function taskStatusCheck(taskBack, taskFront) {
  if(taskBack[2] === '仕掛中' && taskFront[2] === '未着手') {
    return true;
  } else if (taskBack[2] === taskFront[2]) {
    // ステータスが同じ場合、No.をチェックする
    return taskIndexCheck(taskBack, taskFront);
  }
  return false;
}

 /**
 * 後ろのタスクのNo.の方が、前のタスクより番号が若かった場合、trueを返す（入れ替える）
 * @param {number[]} taskBack - 後ろのタスクが格納されている配列
 * @param {number[]} taskFront - 前のタスクが格納されている配列
 */
function taskIndexCheck(taskBack, taskFront) {
  if (taskBack[0] < taskFront[0]) {
    return true;
  }
  return false;
}

 /**
 * 日付のフォーマット
 * @param {number[][]} array - 日付がフォーマットされていないタスク一覧の二次元配列
 */
function taskDateFormat(array) {
  for (let i = 1; i < array.length; i++) {
    array[i][3] = Utilities.formatDate(array[i][3], "JST", "yyyy/MM/dd");
  }
}

 /**
 * 画面で入力されたタスクをスプレッドシートに記録する
 * @param {String} taskContents - 画面で入力されたタスクの内容
 * @param {number} taskDeadline - 画面で入力されたタスクの期限日
 * @return {number[][]} 新しいタスクを追加した後、ソートされたタスク一覧の二次元配列
 */
function setTaskFromWebApp(taskContents, taskDeadline) {
  const taskList = getTaskList(); 
  const newTask = [taskList[taskList.length - 1][0] + 1, taskContents, '未着手', taskDeadline];
  getTaskSheet().getRange(`A${taskList.length + 1}:D${taskList.length + 1}`).setValues([newTask]);
  return getSortTaskList(getTaskList());
}
 
 /**
 * 指定したタスクのステータスを変更する
 * @param {number} taskListIndexFromWebApp - クライアントで表示されているタスク一覧のインデックス
 * @param {String} taskStatus - 変更後のタスクのステータス
 * @return {number[][]} タスクのステータスを変更した後、ソートされたタスク一覧の二次元配列
 */
function setTaskStatus(taskListIndexFromWebApp, taskStatus) {
  const taskList = getSortTaskList(getTaskList()); 
  const taskListIndex = taskList[taskListIndexFromWebApp][0];
  getTaskSheet().getRange(`C${taskListIndex + 1}`).setValue(taskStatus);
  return getSortTaskList(getTaskList());
}
