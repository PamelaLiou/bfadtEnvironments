

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var SerialPort = require('serialport');
var serialVal;

const Readline = SerialPort.parsers.Readline; //how to read raw data
//add your path to the serialport
const mySerialPort = new SerialPort('/dev/cu.usbmodem14131' , {baudRate:9600}); 
const parser = mySerialPort.pipe(new Readline({ delimiter: 'b' })); //try adding different delimiter

//show to see raw bytes
//mySerialPort.on('data', console.log); 

parser.on('data', dataToSerialVal); 


function dataToSerialVal(data){
 	serialVal= data.toString();
 	console.log(serialVal);
 }


// var mySerialPort = new SerialPort('/dev/cu.usbmodem1421', { //paste your port path here
//   parser: SerialPort.parsers.readline('\n')
// });

// mySerialPort.on('data', function (data) {
//   //console.log('Data: ' + data);
//   //serialVal = data;
// });

server.listen(port, function(){
	console.log('Server listening on ' + port);
});

io.on('connection',function(client){
	console.log('Socket connected...');
	//var lastSerialVal;
  	//console.log('Data: ' + data);
  		
  	client.emit('messages', {serialValue: serialVal});
  	client.emit('initialMessage');
  



	//client.emit('messages', {serialValue: serialVal});//inital value
	client.on('getSerialVal', function(){
		//console.log('Data2: ' + serialVal);

	 	client.emit('messages', {serialValue: serialVal});

	});


  		client.on('0', function(){
  			console.log("mouse up")
	 		mySerialPort.write("0");

		});

		client.on('1', function(){
			 console.log("mouse down")

	 		mySerialPort.write("1");

		});

});

app.get('/', function(req,res){
	console.log('serving index.html');
	res.sendFile(__dirname + '/duplex_formatting.html');

});

