/** 
 * [2-2]
 *  以下の内容の関数を作成してください。
 *  (1) 0 が格納されている変数を宣言してください。
 *  (2)  (1) で宣言した変数の値が正の数の場合は'正の数です'、0の場合は'0です'、
 * 　それ以外の場合は'負の数です'をコンソールログに表示する分岐処理をコーディングしてください。
 */
 function checkNumberPositiveZeroNegative() {
    const checkNumber = 0;
    if (checkNumber  > 0) {
        console.log('正の数です');
    } else if (checkNumber === 0) {
        console.log('0です');
    } else {
        console.log('負の数です');
    }
}
