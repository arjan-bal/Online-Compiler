var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var express = require('express');
var app = express();

app.use(cors({
  "origin": "*",
  "responseHeader": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  "method": "POST, GET, PUT,PATCH, DELETE, OPTIONS",
  "maxAgeSeconds": 120
}));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/run/cpp', (req, res) => {
  var compiler = require('./compiler');

  compiler.run(req.body.code, req.body.inputs, res);
});

app.get('*', (req, res) => {
	res.send({ content: "Not Found" });
});

var Port = 8080;

app.listen(Port, () => console.log(`Listening on Port: ${Port}`));


