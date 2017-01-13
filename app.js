const Server = require('./server.js');
const port = (process.env.OPENSHIFT_NODEJS_PORT || 3000);
const ip = (process.env.OPENSHIFT_NODEJS_IP|| '0.0.0.0');
const app = Server.app();

app.listen(port, ip, function(){
  console.log("Listening on " + ip + ", server_port " + port)
});
