(function(){

function ema(values,period){

var result=[];
var multiplier=2/(period+1);

if(values.length===0){
return result;
}

var sum=0;

for(var i=0;i<period && i<values.length;i++){
sum+=values[i];
}

if(values.length<period){
return result;
}

var previous=sum/period;

for(var j=0;j<period-1;j++){
result.push(null);
}

result.push(previous);

for(var k=period;k<values.length;k++){

previous=(values[k]-previous)*multiplier+previous;

result.push(previous);

}

return result;

}


fetch("atch_stock_data.json")

.then(function(response){
return response.json();
})

.then(function(data){

var closes=[];

for(var i=0;i<data.length;i++){
closes.push(Number(data[i].close));
}


var ema12=ema(closes,12);
var ema26=ema(closes,26);

var macd=[];
var labels=[];


for(var j=0;j<data.length;j++){

labels.push(data[j].date.slice(0,10));

if(ema12[j]===null || ema26[j]===null){
macd.push(null);
}else{
macd.push(ema12[j]-ema26[j]);
}

}


var validMacd=[];

for(var m=0;m<macd.length;m++){

if(macd[m]!==null){
validMacd.push(macd[m]);
}

}


var signalValid=ema(validMacd,9);

var signal=[];
var histogram=[];
var signalIndex=0;


for(var n=0;n<macd.length;n++){

if(macd[n]===null){
signal.push(null);
histogram.push(null);
continue;
}

if(signalIndex<8){
signal.push(null);
histogram.push(null);
signalIndex++;
continue;
}

var sig=signalValid[signalIndex];

signal.push(sig);
histogram.push(macd[n]-sig);

signalIndex++;

}


window.macdData={
labels:labels,
macd:macd,
signal:signal,
histogram:histogram
};


if(typeof drawMACD==="function"){
drawMACD(365);
}

})

.catch(function(error){
console.error("MACD 데이터 오류:",error);
});

})();