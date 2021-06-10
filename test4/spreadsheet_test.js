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
  let taskDate = 0;
  
  let expiredFlag = 0;
  let completeFlag = 0;
  let notStartFlag = 0;
  for (let i = 1; i < taskValues.length; i++) {
    taskDate = new Date(taskValues[i][3]);
    if (taskDate.getTime() < new Date().getTime()) {
      situationArrangementSheet.getRange(`A${9 + (i - 1)}:D${9 + (i - 1)}`).setValues([taskValues[i]]);
      expiredFlag++;
      continue;
    }
    if (taskValues[i][2] == '完了') {
      completeFlag++;
    }
    if (taskValues[i][2] == '未着手') {
      situationArrangementSheet.getRange(`A${6 + (i - 1) - expiredFlag - completeFlag}:D${6 + (i - 1) - expiredFlag - completeFlag}`).setValues([taskValues[i]]);
      situationArrangementSheet.insertRowAfter(6 + (i - 1) - expiredFlag - completeFlag);
      notStartFlag++
    }
    if (taskValues[i][2] == '仕掛中') {
      situationArrangementSheet.getRange(`A${3 + (i - 1) - expiredFlag - completeFlag - notStartFlag}:D${3 + (i - 1) - expiredFlag - completeFlag - notStartFlag}`).setValues([taskValues[i]]);
      situationArrangementSheet.insertRowAfter(3 + (i - 1) - expiredFlag - completeFlag - notStartFlag);
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
