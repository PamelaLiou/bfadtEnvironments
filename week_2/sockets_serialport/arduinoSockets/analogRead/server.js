

//Lists Serialports available
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var SerialPort = require('serialport');
// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName); //prints each port to console. 
//   });
// });


// Choose the correct serialport from the list.
// Copy the serial port patch and replace '/dev/cu.usbmodem1411'
// with yours.
// Uncomment the following code, and restart the server.

var serialVal;

var mySerialPort = new SerialPort('/dev/cu.usbmodem1421', { //paste your port path here
  parser: SerialPort.parsers.readline('\n')
});

mySerialPort.on('data', function (data) {
  console.log('Data: ' + data);
  serialVal = data;
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

app.get('/', function(req,res){
	console.log('serving index.html');
	res.sendFile(__dirname + '/analogRead.html');

});

