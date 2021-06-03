/**
 * [2-5]
 * 以下の内容の関数を作成してください。
 * (1) 以下の配列を宣言してください。
 * 　[
 * 　　{name: 'Taro', grade: '2', class: 'B', score: 80},
 * 　　{name: 'Ichiro', grade: '2', class: 'A', score: 100},
 * 　　{name: 'Hanako', grade: '2', class: 'B', score: 90},
 * 　　{name: 'Yoshiko', grade: '3', class: 'B', score: 70},
 * 　　{name: 'Kazu', grade: '1', class: 'B', score: 50},
 * 　]
 * (2) (1)で宣言した配列の要素をループ処理で取り出し、
 * gradeプロパティが '2' であるデータの scoreプロパティの合計をコンソールログに表示してください。
 */
 function printTotalGrade2Score() {
    var classmates = [
        　　{name: 'Taro', grade: '2', class: 'B', score: 80},
        　　{name: 'Ichiro', grade: '2', class: 'A', score: 100},
        　　{name: 'Hanako', grade: '2', class: 'B', score: 90},
        　　{name: 'Yoshiko', grade: '3', class: 'B', score: 70},
        　　{name: 'Kazu', grade: '1', class: 'B', score: 50},
        　];
        
    var totalGrade2Score = 0;
    for (var i = 0; i < classmates.length; i++) {
        if (classmates[i].grade === '2') {
            totalGrade2Score += classmates[i].score;
        }
    }
    console.log(totalGrade2Score);
}
