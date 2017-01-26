var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  response.writeHead(200);
  response.write("Hello, World!");
  response.end();
});

server.listen(8000);
console.log('Serving website on port 8000');
