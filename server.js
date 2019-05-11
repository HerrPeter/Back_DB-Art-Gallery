var http = require('http');
var express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!!');
}).listen(8080);

app.listen(80, () => {
    console.log('Express Server running at port 3000.')
});

http.get('/', (req, res) => {
    res.send('No way jose!');
})