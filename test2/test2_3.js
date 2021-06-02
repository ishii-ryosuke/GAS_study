/** 
 * [2-3]
 *  以下の内容の関数を作成してください。
 *  (1) 90 が格納されている変数を宣言してください。
 *  (2) (1) で宣言した変数の値が 80 以上の場合は'優'、
 * 　 60以上でかつ79以下の場合は'良'、
 * 　 40以上でかつ59以下の場合は'可'、
 * 　 それ以外は'不可'をコンソールログに表示する分岐処理をコーディングしてください。
 */
 function checkScore() {
    const score = 90;
    switch (true) {
        case score >= 80:
            console.log('優');
            break;
        case score >= 60 && score <= 79:
            console.log('良');
            break;
        case score >= 40 && score <= 59:
            console.log('可');
            break;
        default:
            console.log('不可');
    }
}
