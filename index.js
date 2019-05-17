var fs, http, mimetypes, options, path, server;

fs = require('fs');
http = require('http');
path = require('path');

mimetypes = {
    'css':'text/css',
    'html':'text/html',
    'txt':'text/plain'
}

server = http.createServer(function(request, response){
    if(request.url == '' || request.url == '/'){
        response.writeHead(200, {'Content-Type' : mimetypes['txt']});
        response.write('Good Evening, Sir.');
        response.end();
    }
})

server.listen('3000', () => {
    console.log('Server started!');
});