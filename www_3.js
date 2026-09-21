const http = require('http');
//moodul päringu parsimiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//moodul failide haldamiseks, ASYNC puhul on vaja seda toetavat erilisemat moodulit
//const fs = require('fs');
const fs = require('fs').promises;
http.createServer(async function(req, res){
//parsin url-id
console.log('Päring: ' + req.url);
let currentURL = url.parse(req.url, true);
console.log('Parsituna: ' + currentURL.pathname);

//hakkame erinevaid lehti jaokama -> routes 

const dateTimeET = require ('./src/dateTimeET');
//ctrl+c, et sulgeda puttys
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kevin Sauaug, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Kevin Sauaug, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>' + '\t<p>Tänane kuupäev: ' + dateTimeET.fullDate() + '</p>\n' + '\t<p>Praegune kellaaeg: ' + dateTimeET.fullTime() + '</p>\n' +'\t<hr>';
const pageBanner= '<img src="veebiprogrammeerimine_2026_TA.png" alt="">';
const pageFoot = '\n</body>\n</html>';

if(currentURL.pathname === '/'){
    res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBody);
	res.write(pageBanner);
	res.write ('\n\t<ul>\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
	res.write ('\n\t</ul>')
	res.write(pageFoot);
	//res.write('Veeb läkski käima!');
	return res.end();
}

else if (currentURL.pathname === '/vanasona'){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write('\t<h1>Eesti vanasõnad </h1>\n\t<p>Siin näed tänase päeva vanasõna.</p>\n\t<hr>')
	res.write ('\n\t<p><a href="/">Tagasi avalehele </a></p>');
	res.write(pageBanner);
	res.write(pageFoot);
	return res.end();
}

else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
	//teeme pildi tegeliku asukoha programmile kättesaadavaks
	let picPath = path.join(__dirname, 'pic', 'veebiprogrammeerimine_2026_TA.png');
	try {
		const data = await fs.readFile(picPath);
		res.writeHead(200, {"Content-type": "image/png"});
		res.end(data);
	} catch(err){
			res.writeHead( 404, {"Content-type": "text/plain; charset=utf8"});
			return res.end ('Pilti ei leitud!');
	}
} 

else {
	res.end('Viga 404, ei leisa sellist lehte!');
}
}).listen(5105);