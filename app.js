const SocketIo = require('socket.io');
const server = require('./server.js');
const port = (process.env.OPENSHIFT_NODEJS_PORT || 3000);
const ip = (process.env.OPENSHIFT_NODEJS_IP|| '0.0.0.0');
const app = server.app();

var http = require('http').Server(app);

const io = new SocketIo(http, {path: '/api/chat'})
const socketEvents = require('./socketEvents')(io);

http.listen(port, ip, function(){
  console.log("Listening on " + ip + ", server_port " + port)
});
