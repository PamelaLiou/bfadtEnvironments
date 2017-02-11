

//Lists Serialports available

var SerialPort = require('serialport');
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName); //prints each port to console. 
  });
});


//Choose the correct serialport from the list.
//Copy the serial port patch and replace '/dev/cu.usbmodem1411'
//with yours.
//Uncomment the following code, and restart the server.



// var port = new SerialPort('/dev/cu.usbmodem1411', { //paste your port path here
//   parser: SerialPort.parsers.readline('\n')
// });

// port.on('data', function (data) {
//   console.log('Data: ' + data);
// });
