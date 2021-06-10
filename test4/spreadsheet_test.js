/**
 * [SpreadSheet課題]
 * 1. スプレッドシートの初期表示時にメニューが表示されるようにしましょう。
 * 
 * 2. 表示されたメニュー内の「状況分析」をクリックすると
 * 　「状況分析_template」シートをコピーし、シート名を「状況整理_YYYYMMDDHHmmSS」の形式で設定してください。
 * 　※YYYY:年、MM:月、DD:日、HH:時、mm：分、SS：秒
 * 
 * 　タスク一覧から以下のタスクを抽出してコピーしたシートに出力してください。
 * 　・仕掛中のタスク：タスク一覧のうち、ステータスが「仕掛中」となっている行データのみを抽出してください。
 * 　・未着手のタスク：タスク一覧のうち、ステータスが「未着手」となっている行データのみを抽出してください。
 * 　・期限が過ぎているタスク：タスク一覧のうち、期限日が本日日付よりも古い日付の場合はその行データを抽出してください。
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('GASメニュー')
    .addItem('状況分析', 'menuSituationalAnalysis')
    .addToUi();
}

function menuSituationalAnalysis() {
  const mySpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const situationArrangementSheet = makeSituationArrangementSheet(mySpreadsheet);
  const taskValues = getTaskValues(mySpreadsheet);
  taskAdjustment(situationArrangementSheet, taskValues);
}

function getTaskValues(mySpreadsheet) {
  const taskSheet = mySpreadsheet.getSheetByName('タスク一覧');
  const taskValues = taskSheet.getDataRange().getValues();

  return taskValues;
}

function makeSituationArrangementSheet(mySpreadsheet) {
  const templateSheet = mySpreadsheet.getSheetByName('状況分析_template');
  const copySheet = templateSheet.copyTo(mySpreadsheet);
  copySheet.setName(`状況整理_${dateToStr24HPad0(new Date())}`);

  return copySheet;
}

function taskAdjustment(situationArrangementSheet, taskValues) {
  let expiredCount = 0;
  let completeCount = 0;
  let notStartCount = 0;
  for (let i = 1; i < taskValues.length; i++) {
    let taskDate = 0;
    taskDate = new Date(taskValues[i][3]);
    if (taskDate.getTime() < new Date().getTime()) {
      let expiredTaskPosition = 9 + (i - 1);
      situationArrangementSheet.getRange(`A${expiredTaskPosition}:D${expiredTaskPosition}`).setValues([taskValues[i]]);
      expiredCount++;
      continue;
    }
    if (taskValues[i][2] == '完了') {
      completeCount++;
    }
    if (taskValues[i][2] == '未着手') {
      let notStartTaskPosition = 6 + (i - 1) - expiredCount - completeCount;
      situationArrangementSheet.getRange(`A${notStartTaskPosition}:D${notStartTaskPosition}`).setValues([taskValues[i]]);
      situationArrangementSheet.insertRowAfter(notStartTaskPosition);
      notStartCount++
    }
    if (taskValues[i][2] == '仕掛中') {
      let inProcessTaskPosition = 3 + (i - 1) - expiredCount - completeCount - notStartCount;
      situationArrangementSheet.getRange(`A${inProcessTaskPosition}:D${inProcessTaskPosition}`).setValues([taskValues[i]]);
      situationArrangementSheet.insertRowAfter(inProcessTaskPosition);
    }
  }
}

function dateToStr24HPad0(date) {
  const str = date.getFullYear()
    + ('0' + (date.getMonth() + 1)).slice(-2)
    + ('0' + date.getDate()).slice(-2)
    + ('0' + date.getHours()).slice(-2)
    + ('0' + date.getMinutes()).slice(-2)
    + ('0' + date.getSeconds()).slice(-2);
  
  return str;
}
