function setCookie(b, d, a) { var c = new Date();
	c.setDate(c.getDate() + a);
	document.cookie = b + "=" + d + "; expires=" + c; }

function getCookie(c) {
	var a = document.cookie.split("; ");
	for (var d = 0; d < a.length; d++) { var b = a[d].split("="); if (b[0] == c) { return b[1]; } }
	return "";
}

function removeCookie(a) { setCookie(a, 1, -1); }