var numer = [0, 0];
var nextnumer = [0, 0];
var count = 0;
var denom = 0;
var total = [0, 0];
var tmpx = [];
var tmpy = [];

function smoother(center,n){
   var wma = [2];
   var nextwma = [2];
   denom = (n*(n + 1))/2;
   
    if(count < n){
    tmpx[count] = center[0];
    tmpy[count] = center[1];
    total[0] += center[0];
    total[1] += center[1]; 
    count++;
    numer[0] += (count * center[0]);
    numer[1] += (count * center[1]);
    if(count == n){
    //denom = (n*(n + 1))/2;
    wma[0] = numer[0]/denom;
    wma[1] = numer[1]/denom;
    return wma;
    }
    wma[0] = 0;
    wma[1] = 0;
    return wma;
    }
    
    if(count >= n){
    //denom = (n*(n + 1))/2;
    nextnumer[0] = numer[0] + n*center[0] - total[0];
    numer[0] = nextnumer[0];
    total[0] = total[0] + center[0] - tmpx[0];
    tmpx.shift();//delete start
    tmpx.push(center[0]);//add end
    nextwma[0] = nextnumer[0]/denom;
    
    nextnumer[1] = numer[1] + n*center[1] - total[1]; 
    numer[1] = nextnumer[1];
    total[1] = total[1] + center[1] - tmpy[0];
    tmpy.shift();
    tmpy.push(center[1]);
    nextwma[1] = nextnumer[1]/denom;
    
    return nextwma;
    
    }
}
