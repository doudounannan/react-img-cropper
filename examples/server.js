const express = require('express');
const formidable = require('formidable');
const path = require('path');

const PORT = 4000;

const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT);

console.log(`http://localhost:${PORT}`);

/* 图片上传路由 */
app.post('/uploader', function(req, res) {
	const form = new formidable();

	form.encoding = 'utf-8';
	form.uploadDir = `${__dirname}/static/uploadedImg`;
	form.keepExtensions = true;

	form.parse(req, function(err, fields, files) {
		res.json({
			code: 0
		});
	});
});
