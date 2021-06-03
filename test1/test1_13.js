/**
 * [1-13]
 * 以下の内容の関数を作成してください。
 * (1) 以下の配列を宣言してください。
 * 　[
 * 　　{name: 'Taro', grade: '2', class: 'B', score: 80},
 * 　　{name: 'Ichiro', grade: '2', class: 'A', score: 100},
 * 　　{name: 'Hanako', grade: '2', class: 'B', score: 90},
 * 　　{name: 'Yoshiko', grade: '3', class: 'B', score: 70},
 * 　　{name: 'Kazu', grade: '1', class: 'B', score: 50},
 * 　]
 * (2) (1) で宣言した配列から名前のみ取り出して配列に格納してください。
 * (3) (2) で名前のみを取り出した配列をコンソールログに表示してください。
 * ※ 名前は name プロパティであることを前提とします。
 */
function printArrayNameFromArrayClassmates() {
    var classmates = [
        　　{name: 'Taro', grade: '2', class: 'B', score: 80},
        　　{name: 'Ichiro', grade: '2', class: 'A', score: 100},
        　　{name: 'Hanako', grade: '2', class: 'B', score: 90},
        　　{name: 'Yoshiko', grade: '3', class: 'B', score: 70},
        　　{name: 'Kazu', grade: '1', class: 'B', score: 50},
        　];
    var names = classmates.map(
        function(classmate) {
            return classmate.name;
        }
    );
    console.log(names);
}
