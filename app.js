// express setup
var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.get("/", function(req, res) {
  res.render("index");
});

// mongoose setup
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://heroku_11j5ndg9:41ipkd3dlc5fbpbpfc8pi3vpsq@ds113678.mlab.com:13678/heroku_11j5ndg9');
mongoose.connection.once('connected', function() {
  console.log("Connected successfully to mLab database: heroku_11j5ndg9");
});

// morgan setup
var morgan = require('morgan'); // log request details
app.use(morgan('dev'));

// bodyparser setup
var bodyParser = require('body-parser'); // parse incoming request bodies
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// methodoverride setup
var methodOverride = require('method-override'); // allow using delete
app.use(methodOverride());

// Define the todo model
var Todo = mongoose.model('Todo', {
  text:String
});

// Get from /items
app.get('/items', function(req, res) { // use mongoose to get all todos from database
  Todo.find(function(err, todos) {
    if(err) {
      res.send(err);
    }
    res.json(todos); // return all todos in JSON format
  });
});

// Post to /items
app.post('/items', function(req, res) {
  Todo.create({
    text:req.body.text,
    done:false
  }, function(err, todo) {
    if(err) {
      res.send(err);
    }
    Todo.find(function(err, todos) {
      if(err) {
        res.send(err);
      }
      res.json(todos);
    });
  });
});

// Delete from /items
app.delete('/items/:item_id', function(req, res) {
  Todo.remove({
    _id : req.params.item_id
  }, function(err, todo) {
    if(err) {
      res.send(err);
    }
    Todo.find(function(err, todos) {
      if(err) {
        res.send(err);
      }
      res.json(todos);
    });
  });
});

// Pick a port and run app
var port = process.env.PORT || 8080;
app.listen(port);
console.log('App running');

// Prevent the Heroku app from sleeping
var http = require("http");
setInterval(function() {
  http.get("http://rickydam-todolist.herokuapp.com");
}, 1500000); // Ping the website every 25 minutes
