var formatCSV = '';

alert(smoothResult[50][1]);
exportCSV(smoothResult);

function exportCSV(content){
    for (var i = 0; i < content.length; i++){
        var value = content[i];
        for(var j = 0; j < value.length; j++){
            formatCSV += String(content[i][j]);
            formatCSV += ',';
        }
        formatCSV +='¥n';
    }
    
  var download = document.getElementById('download');
  download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(formatCSV));
  download.setAttribute('download', 'smoothResult.csv');
    
}