const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const https = require("https");
const fs = require("fs");
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const port = process.env.PORT || 3000;
https.createServer({
    key: fs.readFileSync('../SSL/commercial.key'),
    cert: fs.readFileSync('../SSL/f2e066dddbc1a42e.crt'),
    ca: [fs.readFileSync('../SSL/gd1.crt'), fs.readFileSync('../SSL/gd2.crt'), fs.readFileSync('../SSL/gd3.crt')]
}, app).listen(port, () => console.log(`Server is listnening on port ${port}`));
