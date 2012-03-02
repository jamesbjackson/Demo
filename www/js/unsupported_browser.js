var total = 0;
var features = 0;
for (var feature in Modernizr){ 
	if(Modernizr[feature]) features++;
	total++;
}
var percentage = Math.round((features / total) * 100);
try{ if(WebKitCSSMatrix == null) percentage = percentage - 1; }
catch(e){ percentage = percentage - 1; }
var valueArray = String(percentage).split("");
var valueOne = (percentage != 100) ? 0 : valueArray[0];
var valueTwo = (percentage != 100) ? valueArray[0] : valueArray[1];
var valueThree = (percentage != 100) ? valueArray[1] : valueArray[2];
valueTwo = (percentage < 10) ? 0 : valueTwo;
valueThree = (percentage < 10) ? valueArray[0] : valueThree;
$(".progress-info .value-one").html(valueOne);
$(".progress-info .value-two").html(valueTwo);
$(".progress-info .value-three").html(valueThree);
