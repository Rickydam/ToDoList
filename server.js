// Express set up
var express = require('express');
var app = express();

// Mongoose set up
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://heroku_11j5ndg9:41ipkd3dlc5fbpbpfc8pi3vpsq@ds113678.mlab.com:13678/heroku_11j5ndg9');
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
