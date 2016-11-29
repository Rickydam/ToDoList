// Express set up
var express = require('express');
var app = express();

// Mongoose set up
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/items');
mongoose.connection.once('connected', function() {
  console.log("Connected to database: items.");
});

// Set up for the rest
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Run index.html
app.use(express.static(__dirname));
app.get("/", function(req, res) {
  res.render("index");
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// Define model
var Todo = mongoose.model('Todo', {
  text:String
});

// Routes
app.get('/items', function(req, res) { // use mongoose to get all todos from database
  Todo.find(function(err, todos) {
    if(err) {
      res.send(err);
    }
    res.json(todos); // return all todos in JSON format
  });
});

// Show the items
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

// Listen on port 8080
app.listen(8080)
console.log("App running on https://localhost:8080/");
