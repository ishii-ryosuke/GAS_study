/**
 * [2-6]
 * 以下の内容の関数を作成してください。
 * (1) 以下の2次元配列を宣言してください。
 * [
 *   ['Taro', 80],
 *   ['Ichiro', 100],
 *   ['Hanako', 90]
 *   ['Yoshiko', 70],
 *   ['Kazu', 50]
 * ]
 * (2) (1) で宣言した2次元配列から各要素の2要素目を取り出し、
 * 　 その合計をコンソールログに表示してください。
 */
 function printTotal2DArrayNumbers() {
    const array2DNumbers = [
        　['Taro', 80],
        　['Ichiro', 100],
        　['Hanako', 90],
        　['Yoshiko', 70],
        　['Kazu', 50]
      　];
    var totalNumbers = 0;
    for (var i = 0; i < array2DNumbers.length; i++) {
        totalNumbers += array2DNumbers[i][1];
    }
    console.log(totalNumbers);
}
