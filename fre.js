//获取字符串长度,英文一个,汉子2个长度   正常字符串的length 没有区分出。
function GetLength(str){
	var realLength = 0, len = str.length, charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
}


//模板template
function loadTemplate(id){
var element = document.querySelector(id);
	if(!element){
	return;
	}
var templateHtml = element.innerHTML;
	if(!templateHtml){
	return;
	}
var regex = /\{\$\w+\}/g;
var htmlArg = templateHtml.split(regex);
var paramArg = templateHtml.match(regex);

for(var paramIndex in paramArg){
var param = paramArg[paramIndex];
	paramArg[paramIndex] = param.substring(2, param.length - 1);
	htmlArg.splice(paramIndex * 2 + 1 , 0, "");
	}
var templateData = {};
	templateData["id"] = id;
	templateData["template"] = htmlArg;
	templateData["params"] = paramArg;
	return templateData;
}

function drawTemplate(json, templateArg, paramArg){
var entityArg = templateArg.concat();
for(var index in paramArg){
	var finalParam = paramArg[index];
		entityArg[index * 2 + 1] = json[finalParam];
}
	return entityArg.join("");
}

function drawListTemplate(listJson, templateData, dataformat){
var templateArg = templateData["template"];
var paramArg = templateData["params"];
var htmlArg = [];
var dataformatFunction = eval(dataformat);
if(dataformatFunction && typeof(dataformatFunction)=="function"){
for(var row in listJson){
var rowJson = dataformatFunction(listJson[row]);
htmlArg[row] = drawTemplate(rowJson, templateArg, paramArg);
}
}else{
for(var row in listJson){
htmlArg[row] = drawTemplate(listJson[row], templateArg, paramArg);
	}
}
return htmlArg.join("");
}

