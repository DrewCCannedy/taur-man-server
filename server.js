const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Instance } = require('./models/instance');

const PORT = process.env.PORT || 3000;
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

app.get('/ip', (req, res) => {
  res.send("Address: " + HOST + ":" + PORT);
})

app.listen(PORT, () => {
  console.log(`Started express server on port ${PORT}`);
});

app.post('/create', (req, res) => {
  var instance = new Instance({
    humanX: 0,
    humanY: 0,
    taurX: 0,
    taurY: 0
  });

  instance.save().then((doc) => {
    res.status(200).json({ id: doc.id });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.post('/delete', (req, res) => {
  delete_id = req.query.id;
  Instance.findByIdAndRemove(delete_id, (err, doc) => {
    if (err) {
      return res.send(err);
    }
    return res.status(200).send();
  })
})

app.post('/instance', (req, res) => {
  id = req.query.id;
  Instance.findById(id).then((instance) => {
    if (req.query.o_spartanX) {
      instance.o_spartanX = req.query.o_spartanX;
    }
    if (req.query.o_spartanY) {
      instance.o_spartanY = req.query.o_spartanY;
    }
    if (req.query.o_minotaurX) {
      instance.o_minotaurX = req.query.o_minotaurX;
    }
    if (req.query.o_minotaurY) {
      instance.o_minotaurY = req.query.o_minotaurY;
    }
    instance.save();
    res.send();
  }, (e) => {
    res.status(400).send(e);
  });
});