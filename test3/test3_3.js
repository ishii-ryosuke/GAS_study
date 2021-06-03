/**
 * [3-3]
 * 以下の関数を作成して、作成した関数を呼び出してください。
 * (1) 変数を宣言して以下のオブジェクトを代入してください。
 * 　{  
 * 　   name: 'Taro',
 * 　   grade: 2,
 * 　   class: 'B',
 * 　　score: 80,
 * 　}
 * (2) (1) で宣言したオブジェクトに以下の内容のメソッドを追加してください。
 * ＜追加するメソッドの内容＞
 * ・コンソールログに「My Name is Taro」と表示してください。
 * 　※ 表示する文言内の「Taro」はオブジェクトの nameプロパティ から取得してください。
 * (3) (2) で追加したメソッドを呼び出して実行してください。
 */
function addMethodToTaroObject() {
  var taroObject = {
    name: 'Taro',
    grade: 2,
    class: 'B',
    score: 80,
  }
  taroObject.selfIntroduce = function() {
    console.log(`My Name is ${taroObject.name}`);
  }
  taroObject.selfIntroduce(); 
}

