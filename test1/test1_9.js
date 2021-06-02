/**
 * [1-9]
 * 以下の内容の関数を作成してください。
 * (1) 以下の2次元配列を宣言してください。
 * [
 *   ['name', 'score'],
 *   ['Taro', 80],
 *   ['Ichiro', 100],
 *   ['Hanako', 90]
 * ]
 * (2) (1) で宣言した2次元配列から先頭の要素を取り除き、
 * 　 残った2次元配列をコンソールログに表示してください。
 */
function printShiftArray() {
    var box = [
        ['name', 'score'],
        ['Taro', 80],
        ['Ichiro', 100],
        ['Hanako', 90]
    ];
    box.shift();
    //console.log(box);
    console.log(`[\n [${box.join(']\n [')}]\n]`);
}
