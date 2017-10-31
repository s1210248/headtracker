//CSVファイルを読み込む関数getCSV()の定義
var smoothResult = [];

function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "js/sample.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
	convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
    for(i = 0;i<result.length;i++){
        for(var j = 0; j < 2; j++){
            if(j == 0){
                result[i][j] = Number(result[i][j]);
            }
            else{
                var random = Math.floor(Math.random()*11)-5;
                result[i][j] = Number(result[i][0]) + random;
            }
        
        }
       smoothResult[i] = smoother(result[i],50);
    }

alert("change1");
//execute
//var content =  [[1,2,3],[4,5,6],[7,8,9]]
exportcsv(smoothResult);
 
//function
function exportcsv(content){
  var finalVal = '';
  for (var i = 0; i < content.length; i++) {
    var value = content[i];
 
    for (var j = 0; j < value.length; j++) { var innerValue = value[j]===null?'':value[j].toString(); var result = innerValue.replace(/"/g, '""'); if (result.search(/("|,|\n)/g) >= 0)
      result = '"' + result + '"';
      if (j > 0)
      finalVal += ',';
      finalVal += result;
    }
    finalVal += '\n';
  }
 
  //set csv-data to a-tag on html
  var download = document.getElementById('download');
  download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));
  download.setAttribute('download', 'smoothResult50.csv');
}
}

getCSV(); //最初に実行される