const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

var {mongoose} = require('./db/mongoose');
var {Instance} = require('./models/instance');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('view engine', 'hbs');

var type = "type";
var test = "test";

app.post('/create', (req, res) => {
  var instance = new Instance({
    humanX: 0,
    humanY: 0,
    taurX: 0,
    taurY: 0
  });

  instance.save().then((doc) => {
    res.status(200).json({id: doc.id});
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
    if (req.query.humanX) {
      instance.humanX = req.query.humanX;
    }
    if (req.query.humanY) {
      instance.humanY = req.query.humanY;
    }
    if (req.query.taurX) {
      instance.taurX = req.query.taurX;
    }
    if (req.query.taurY) {
      instance.taurY = req.query.taurY;
    }
    instance.save();
    res.send();
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/instance', (req, res) => {
  Instance.findOne().then((instance) => {
    res.send(instance);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/test', (req, res) => {
  res.render("test.hbs", {
    test,
    type,
  });
});

app.post('/test', (req, res) => {
  test = JSON.stringify(req.body);
  type = req.headers["content-type"];
  res.send(req.body);
}, (err) => {
  res.status(400).send(err);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});