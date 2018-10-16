const express = require('express');

var {mongoose} = require('./db/mongoose');
var {Instance} = require('./models/instance');

const port = process.env.PORT || 3000;
var app = express();

app.post('/instance', (req, res) => {
  var instance = new Instance({
    text: req.body.text,
  });

  instance.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/instance', (req, res) => {
  instance.findOne().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});