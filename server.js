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

app.post('/create', (req, res) => {
  var instance = new Instance({
    text: "Fresh Instance",
  });

  instance.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.post('/instance', (req, res) => {
  text = req.query.text;
  Instance.findOne().then((instance) => {
    instance.text = text;
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