/** 
 * [2-1]
 *  以下の内容の関数を作成してください。
 *  (1) 10 が格納されている変数を宣言してください。
 *  (2) (1) で宣言した変数の値が偶数の場合は '偶数です'、
 * 　奇数の場合は'奇数です'をコンソールログに表示する分岐処理をコーディングしてください。
 */
 function checkEvenOdd() {
    const checkNumber = 10;
    if (checkNumber % 2 === 0) {
        console.log('偶数です');
    } else {
        console.log('奇数です');
    }
}
