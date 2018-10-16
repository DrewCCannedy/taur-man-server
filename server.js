const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Instance} = require('./models/instance');

const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.text());

app.post('/instance', (req, res) => {
  console.log(req.body);
  var instance = new Instance({
    text: req.body,
  });

  instance.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
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