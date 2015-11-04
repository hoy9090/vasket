
_getDate();
setInterval(function(){_getDate();},1000);

function _getDate(){
	var date = new Date();
	var then = new Date('12/1/2015 00:00:00');
	then.setMonth(then.getMonth() - date.getMonth());
	then.setDate(then.getDate()-date.getDate());
	then.setHours(then.getHours()-date.getHours());
	then.setMinutes(then.getMinutes()-date.getMinutes());
	then.setSeconds(then.getSeconds()-date.getSeconds());
	var options = {
	
		day: "numeric", hour: "2-digit", minute: "2-digit",
		second: "2-digit"
	};

	document.getElementById("d-day").innerHTML="D-Day : " + then.toLocaleTimeString("ko-kr", options);
}

function divClose() {
	$("#D-day").empty();
}
/*
var now = new Date();
var then = new Date("december 25,2015");
var gap = then.getTime() - now.getTime();
gap = Math.floor(gap / (1000 * 60 * 60 * 24));
document.getElementById("d-day").innerHTML="D-Day : "+gap;*/