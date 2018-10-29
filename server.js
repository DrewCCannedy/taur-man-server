const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const queryString = require('query-string');

var { mongoose } = require('./db/mongoose');
var { Instance } = require('./models/instance');


// https://techbrij.com/node-js-tcp-server-client-promisify
const net = require('net');

// Configuration parameters
const HOST = 'localhost';
const PORT = process.env.PORT || 3000;

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


var app = express();
app.use(bodyParser.json());


app.get('/instance', (req, res) => {
  if (req.query.id) {
    id = req.query.id;
    Instance.findById(id).then((instance) => {
      res.send(instance);
    }, (e) => {
      res.status(400).send(e);
    })
  } else {
    Instance.findOne().then((instance) => {
      res.send(instance);
    }, (e) => {
      res.status(400).send(e);
    });
  }
});

app.get('/instances', (req, res) => {
  Instance.find().then((instances) => {
    res.send(instances);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(PORT, () => {
  console.log(`Started express server on port ${PORT}`);
});

// app.post('/create', (req, res) => {
//   var instance = new Instance({
//     humanX: 0,
//     humanY: 0,
//     taurX: 0,
//     taurY: 0
//   });

//   instance.save().then((doc) => {
//     res.status(200).json({ id: doc.id });
//   }, (err) => {
//     res.status(400).send(err);
//   });
// });

// app.post('/delete', (req, res) => {
//   delete_id = req.query.id;
//   Instance.findByIdAndRemove(delete_id, (err, doc) => {
//     if (err) {
//       return res.send(err);
//     }
//     return res.status(200).send();
//   })
// })

// app.post('/instance', (req, res) => {
//   id = req.query.id;
//   Instance.findById(id).then((instance) => {
//     if (req.query.o_spartanX) {
//       instance.o_spartanX = req.query.o_spartanX;
//     }
//     if (req.query.o_spartanY) {
//       instance.o_spartanY = req.query.o_spartanY;
//     }
//     if (req.query.o_minotaurX) {
//       instance.o_minotaurX = req.query.o_minotaurX;
//     }
//     if (req.query.o_minotaurY) {
//       instance.o_minotaurY = req.query.o_minotaurY;
//     }
//     instance.save();
//     res.send();
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });