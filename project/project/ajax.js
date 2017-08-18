var xmlhttp;
function loadXmlDocGet(url,func,method){
	
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = func;
	xmlhttp.open(method,url,true);
	xmlhttp.send();
}
function bookXml(){
	loadXmlDocGet('book.xml',function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var x = xmlhttp.responseXML;
			var txt = '';

			var book = x.getElementsByTagName('title');
			console.log(book);
			for(var i = 0; i < book.length; i++){
				 txt = txt + '<div>'+book[i].childNodes[0].nodeValue+'</div>';
				 
			}
			document.getElementById("myDiv").innerHTML = txt;
		}
	},'GET');
}

window.onload = function(){
	/*loadXmlDoc();*/
	document.getElementById("book_list").onclick = function(){
		bookXml();
	};
}