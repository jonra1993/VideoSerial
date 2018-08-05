//https://github.com/FaztWeb/node-arduino-serialport.git
//https://www.youtube.com/watch?v=ogzvDX9npC0
//instalar node https://nodejs.org/es/download/package-manager/
//npm install express
//npm install serialport
//npm install http
//npm install socket.io
//npm i jquery

//para ejecutar npm start   o npm server
//libreri serialport https://www.npmjs.com/package/serialport#raspberry-pi-linux


//otro ex analogo https://github.com/indiejoseph/arduino-node.js-serialport-socket.io

/* iniciar node.js modules
  npm init
*/
const path = require('path');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIo.listen(server);

// settings

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

// static files
app.use(express.static(__dirname + '/public/'));

const SerialPort = require('serialport');
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(' - pnpId: ' + port.pnpId);
    console.log(' - manufacturer: ' + port.manufacturer);
    console.log(' - serialNumber: ' + port.serialNumber);
    console.log(' - vendorId: ' + port.vendorId);
    console.log(' - productId: ' + port.productId);
  });
});
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 19200
});

port.pipe(parser);

port.on('open', function () {
  console.log('Opened Port.');
});

port.on('data', function (data) {
  //console.log('Data:', data);
  //console.log(parseInt(data));
  //console.log(data.toString());
  io.emit('arduino:data', {
    value: data.toString()
  });
});

//envio de mensaje por el puerto serie
/*port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});*/
//port.write('Hi Mom!');
//port.write(Buffer.from('Hi Mom!'));

//open errors will be emitted as an error event
port.on('err', function (data) {
  console.log(err.message);
});

server.listen(3100, () => {
  console.log('Server on port 3100');
});
