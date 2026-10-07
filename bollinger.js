(function(){

function sma(values,period,index){
if(index<period-1)return null;
var sum=0;
for(var i=index-period+1;i<=index;i++)sum+=values[i];
return sum/period;
}

fetch("atch_stock_data.json")
.then(function(response){return response.json();})
.then(function(data){

var labels=[];
var middle=[];
var upper=[];
var lower=[];

for(var i=0;i<data.length;i++){

var closes=[];

for(var j=0;j<data.length;j++){
closes.push(Number(data[j].close));
}

var ma=sma(closes,20,i);

if(ma===null){
middle.push(null);
upper.push(null);
lower.push(null);
continue;
}

var sum=0;

for(var k=i-19;k<=i;k++){
sum+=Math.pow(closes[k]-ma,2);
}

var std=Math.sqrt(sum/20);

labels.push(data[i].date.slice(0,10));
middle.push(ma);
upper.push(ma+2*std);
lower.push(ma-2*std);

}

window.bollingerData={
labels:labels,
middle:middle,
upper:upper,
lower:lower
};

if(typeof drawBollinger==="function"){
drawBollinger(365);
}

})
.catch(function(error){
console.error("볼린저 밴드 데이터 오류:",error);
});

})();