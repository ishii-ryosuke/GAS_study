/**
 * [1-8]
 * 以下の内容の関数を作成してください。
 * (1) 空の配列を宣言してください。
 * (2) 宣言した配列に以下の配列を追加してください。
 * 　 ['name', 'score']
 * (3) 宣言した配列に以下の配列を追加してください。
 * 　 ['Taro', 80]
 * (4) (1) で宣言した配列をコンソールログに表示してください。
 */
function printArrayIntoArray() {
    var box = [];
    box.push(['name', 'score']);
    box.push(['Taro', 80]);
    //console.log(box);
    console.log(`[\n [${box.join(']\n [')}]\n]`);
}
