/**
 * [3-4]
 * 以下の関数を作成して、作成した関数を呼び出してください。
 * (1) 以下の grade クラスを作成してください。
 * 　{
 * 　　'name': ''
 * 　　'japanese': 0,
 * 　　'math': 0,
 * 　　'english': 0
 * 　}
 * (2) (1)で作成したクラスに以下の内容のメソッドを追加してください。
 * ＜追加するメソッドの内容＞
 * ・4つの引数を受け取り、先頭からインスタンスのnameプロパティ、japaneseプロパティ
 * 　mathプロパティ、englishプロパティ に設定する。
 * (3) (1)で作成したクラスに以下の内容のメソッドを追加してください。
 * ＜追加するメソッドの内容＞
 * ・インスタンスのname プロパティと japaneseプロパティ、mathプロパティ、englishプロパティの値の合計を、
 * 　以下の文字列の形式で返す。
 * 　「〇〇さんの合計点数：△点」
 * (4) (2) で作成したメソッドで以下の3つのインスタンスを作成してください。
 * ・名前：Taro、国語の点数：70点、数学の点数：60点、英語の点数：80点
 * ・名前：Ichiro、国語の点数：30点、数学の点数：65点、英語の点数：100点
 * ・名前：Hanako、国語の点数：90点、数学の点数：80点、英語の点数：90点
 * (5) (3)で作成した関数を呼び出し、各インスタンスの合計点数を表示してください。
 */
function makeGradeInstance() {
  var grade = {
    'name': '',
    'japanese': 0,
    'math': 0,
    'english': 0
  }
  var Grade = function(name, japaneseScore, mathScore, englishScore) {
    this.name = name;
    this.japanese = japaneseScore;
    this.math = mathScore;
    this.english = englishScore;
    this.calcTotalScore = function() {
      return `${this.name}さんの合計点数：${this.japanese + this.math + this.english}点`;
    }
  }
  var taro = new Grade('Taro', 70, 60, 80);
  var ichiro = new Grade('Ichiro', 30, 65, 100);
  var hanako = new Grade('Hanako', 90, 80, 90);

  console.log(taro.calcTotalScore());
  console.log(ichiro.calcTotalScore());
  console.log(hanako.calcTotalScore());
}
