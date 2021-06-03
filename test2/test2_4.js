/**
 * [2-4]
 * 以下の内容の関数を作成してください。
 * (1) 以下の配列を宣言してください。
 * 　[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * (2) (1)で宣言した配列の要素をループ処理で取り出し、その合計をコンソールログに表示してください。
 */
function printTotalNumbersArray() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var totalNumbers = 0;
    for (var i = 0; i < numbers.length; i++) {
        totalNumbers += numbers[i];
    }
    console.log(totalNumbers);
}