(function(){
function movingAverage(data,period,index){
if(index<period-1){return null;}
var sum=0;
for(var i=index-period+1;i<=index;i++){
sum+=Number(data[i].close);
}
return sum/period;
}

fetch("atch_stock_data.json")
.then(function(response){return response.json();})
.then(function(data){

var labels=[];
var ma5=[];
var ma20=[];
var ma60=[];

for(var i=0;i<data.length;i++){

labels.push(data[i].date.slice(0,10));
ma5.push(movingAverage(data,5,i));
ma20.push(movingAverage(data,20,i));
ma60.push(movingAverage(data,60,i));

}

window.maData={
labels:labels,
ma5:ma5,
ma20:ma20,
ma60:ma60
};

if(typeof drawMA==="function"){
drawMA(365);
}

})
.catch(function(error){
console.error("MA 데이터 오류:",error);
});

})();