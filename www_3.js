const http = require('http');
const dateTimeET = require ('./src/dateTimeET');
//ctrl+c, et sulgeda puttys
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kevin Sauaug, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){

const pageBody = '\t<h1>Kevin Sauaug, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>' + '\t<p>Tänane kuupäev: ' + dateTimeET.fullDate() + '</p>\n' + '\t<p>Praegune kellaaeg: ' + dateTimeET.fullTime() + '</p>\n' +'\t<hr>';

    res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBody);
	res.write(pageFoot);
	//res.write('Veeb läkski käima!');
	return res.end();
}).listen(5105);