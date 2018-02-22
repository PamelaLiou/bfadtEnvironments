//Analog Read, getting values from Arduino (0-1023)

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server); //Web Sockets
var port = process.env.PORT || 8080; //local port
var SerialPort = require('serialport'); //include serialport module
var serialVal; //global variable storing serial values

const Readline = SerialPort.parsers.Readline; //how to read raw data
//add your path to the serialport
const mySerialPort = new SerialPort('/dev/cu.usbmodem1411' , {baudRate:9600}); 
const parser = mySerialPort.pipe(new Readline({ delimiter: 'b' })); //try adding different delimiter
//parser.on('data', console.log);
parser.on('data', function (data) {
  serialVal = data.toString();
  console.log();
});

server.listen(port, function(){
	console.log('Server listening on ' + port);
});

io.on('connection',function(client){
	console.log('Socket connected...');
	client.emit('messages', {serialValue: serialVal});//inital value
	client.on('getSerialVal', function(){
		client.emit('messages', {serialValue: serialVal});

	});

});

// 
// Basic example
// app.get('/', function(req,res){
// 	console.log('serving index.html');
// 	res.sendFile(__dirname + '/analogRead.html');
// 
// });



// L-system example
app.get('/', function(req,res){
	console.log('serving lsystems.html');
	res.sendFile(__dirname + '/lsystems.html');

});

