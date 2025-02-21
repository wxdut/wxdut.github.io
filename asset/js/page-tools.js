$(document).ready(function() {

	// 网络信息

	const xhr = new XMLHttpRequest();
	const url='https://ipinfo.io/?token=0c5c7b06e75c87';
	xhr.open("GET", url);
	xhr.send();
	xhr.onreadystatechange = (e) => {
		var net=JSON.parse(xhr.responseText)
		$('#netIPInput').val(net.ip)
		$('#netTimeZoneInput').val(net.timezone)
		$('#netCountryInput').val(net.country)
		$('#netCityInput').val(net.region + "/" + net.city)
	};

	// 时间戳转换

	refreshCurrTimestrap()
	
	$('#timestampInput').on('input',function(e){
    	this.value=this.value.replace(/[^\d]/g,'')
    	refreshTimestrapOutput()
	});

	$('#timestampSelect').on('change',function(e){
    	refreshTimestrapOutput()
	});

	// 大小写转换

	$('#caseInput').on('input',function(e){
		let val = this.value
    	$('#caseUpper').val(val.toUpperCase())
    	$('#caseLower').val(val.toLowerCase())
	});

	// 进制转换

	$('#numberBase10').on('input',function(e){
		numberBaseChange(this.value, 10)
	});
	$('#numberBase2').on('input',function(e){
		numberBaseChange(this.value, 2)
	});
	$('#numberBase16').on('input',function(e){
		numberBaseChange(this.value, 16)
	});
});

// 时间戳转换

function refreshCurrTimestrap() {
	$('#curTimestamp').val(new Date().valueOf() + "    " + new Date())
	setTimeout(() => {
		refreshCurrTimestrap()
	}, 1000)
}

function refreshTimestrapOutput(argument) {
	$('#timestampOutput').val(calcuateTimestamp(parseInt($('#timestampInput').val()) * parseInt($('#timestampSelect').val())))
}

function calcuateTimestamp(time = +new Date()) {
	if (isNaN(time)) {
		return
	}
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    if (isNaN(date.getTime())) {
    	return "Invalid Timestamp"
    }
    return date.toJSON().substr(0, 19).replace('T', ' ');
}

function numberBaseChange(number, base) {
	var numberBase10 = parseInt(number, base)
	$('#numberBase10').val(numberBase10)
	$('#numberBase2').val(numberBase10.toString(2))
	$('#numberBase16').val(numberBase10.toString(16))
}