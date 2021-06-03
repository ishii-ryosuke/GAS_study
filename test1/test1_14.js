/**
 * [1-14]
 * 以下の内容の関数を作成してください。
 * (1) 以下の配列を宣言してください。
 * 　[
 * 　　{name: 'Taro', grade: '2', class: 'B', score: 80},
 * 　　{name: 'Ichiro', grade: '2', class: 'A', score: 100},
 * 　　{name: 'Hanako', grade: '2', class: 'B', score: 90},
 * 　　{name: 'Yoshiko', grade: '3', class: 'B', score: 70},
 * 　　{name: 'Kazu', grade: '1', class: 'B', score: 50},
 * 　]
 * (2) (1) で宣言した配列から2年B組の要素のみを抽出してコンソールログに表示してください。
 * ※ 名前は name プロパティであることを前提とします。
 */
function printArray2BFromArrayClassmates() {
    var classmates = [
        　　{name: 'Taro', grade: '2', class: 'B', score: 80},
        　　{name: 'Ichiro', grade: '2', class: 'A', score: 100},
        　　{name: 'Hanako', grade: '2', class: 'B', score: 90},
        　　{name: 'Yoshiko', grade: '3', class: 'B', score: 70},
        　　{name: 'Kazu', grade: '1', class: 'B', score: 50},
        　];
    var classmates2B = classmates.filter(
        function(classmate) {
            return classmate.grade === '2' && classmate.class === 'B';
        }
    );
    console.log(classmates2B);
}
