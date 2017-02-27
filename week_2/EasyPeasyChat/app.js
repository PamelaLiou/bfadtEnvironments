var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var allClients="";

server.listen(port, function(){
	console.log('Server listening on ' + port);
});

io.on('connection',function(client){
	console.log('Socket connected...');
	client.emit('messages', {alertBox:'hi there'});

	client.on('setClientName', function(data){
		console.log(data + " has connected");
		client.clientName = data;
		//allClients += data + " ";
	});

	client.on('submission', function(data){
		client.broadcast.emit('submission',  {
			clientName: client.clientName,
			content: data});
		console.log("submission: " + data);
	});

	client.on('getOthersNames', function(){
		client.emit('getOthersNames', {list: allClients});

	});

});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	console.log('serving index.html');
	res.sendFile(__dirname + '/index.html');

});