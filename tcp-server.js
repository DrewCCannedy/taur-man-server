// https://techbrij.com/node-js-tcp-server-client-promisify
const net = require('net');
const queryString = require('query-string');

var { mongoose } = require('./db/mongoose');
var { Instance } = require('./models/instance');

// Configuration parameters
const HOST = 'localhost';
const PORT = 3000;

// Create Server instance 
var server = net.createServer(onClientConnected);

server.listen(PORT, HOST, () => {
  console.log('Server listening on', server.address());
});

function onClientConnected(sock) {
  var remoteAddress = sock.remoteAddress + ':' + sock.remotePort;
  console.log('New client connected:', remoteAddress);

  sock.on('data', (data) => {
    const parsed = queryString.parse(data);
    if (parsed.command == "create") {
      var instance = new Instance();

      instance.save().then((doc) => {
        sock.write({id: doc.id});
      }, (err) => {
        sock.write({error: err});
      });
    } else if (parsed.command == "delete") {
      id = parsed.id;
      Instance.findByIdAndRemove(id, (err, doc) => {
        if (err) {
          return sock.write({error: err});
        }
        sock.write({result: "success"});
      });
    } else if (parsed.command == "update") {
      var id = parsed.id;
      Instance.findById(id).then((instance) => {
        if (parsed.o_spartanX) {
          instance.o_spartanX =parsed.o_spartanX;
        }
        if (parsed.o_spartanY) {
          instance.o_spartanY = parsed.o_spartanY;
        }
        if (parsed.o_minotaurX) {
          instance.o_minotaurX = parsed.o_minotaurX;
        }
        if (parsed.o_minotaurY) {
          instance.o_minotaurY = parsed.o_minotaurY;
        }
        instance.save();
        sock.write({result: "success"});
      }, (err) => {
        sock.write({error: err});
      });
    }
    console.log('%s says: %s', remoteAddress, data);
  });

  sock.on('close', function () {
    console.log('connection from %s closed', remoteAddress);
  });

  sock.on('error', function (err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  });
};