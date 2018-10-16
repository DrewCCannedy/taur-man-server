const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

var {mongoose} = require('./db/mongoose');
var {Instance} = require('./models/instance');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded());
app.set('view engine', 'hbs');

var type = "type";
var test = "test";

app.post('/instance', (req, res) => {
  var instance = new Instance({
    text: req.body,
  });

  instance.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/test', (req, res) => {
  res.render("test.hbs", {
    test,
    type,
  });
});

app.post('/test', (req, res) => {
  test = req.body;
  type = req.headers["content-type"];
  res.send(req);
}, (err) => {
  res.status(400).send(err);
});

app.get('/instance', (req, res) => {
  Instance.findOne().then((instance) => {
    res.send(instance);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});