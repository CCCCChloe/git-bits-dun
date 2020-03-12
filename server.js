// calling express library
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');
var newTodoSchema = mongoose.Schema({
	title: String,
	completed: Boolean,
	priority: String,
	editing: Boolean,
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var connectionString = 'mongodb://ibm_cloud_668496a7_b117_4248_a990_40c08e59cbc7:e3d10b99630d03facb68da2251e41ee1b6d12542efdb7d048f0a079bc7953bb4@a8b8f1b0-76d7-4e00-ba74-a07d6a9ba9fc-0.bn2a2uid0up8mv7mv2ig.databases.appdomain.cloud:31451,a8b8f1b0-76d7-4e00-ba74-a07d6a9ba9fc-1.bn2a2uid0up8mv7mv2ig.databases.appdomain.cloud:31451/ibmclouddb?authSource=admin&replicaSet=replset';
var connectionString = 'mongodb+srv://TeamTwo:team12345two@cluster0-tohqa.mongodb.net/test?retryWrites=true&w=majority';
var dbname = 'todo';
var str = "";

// connects to a MongoDB database
MongoClient.connect(connectionString, function (err, client) {
	if (err) {
		console.log('error-------------------');
			console.log(err);
	} else {
		var db = client.db(dbname);
		var collection = db.collection('todo_list');
		console.log(db);
		var todos = collection.find({}).toArray;
		collection.find({}).toArray(function(err, todos) {
			console.log(todos);
			app.get('/data', function(req, res) {
				res.json(todos);
				//res.send('<h1>Todo data page!!')
			})
		});

		// post method
		app.post('/post', urlencodedParser, function(req, res) {
			res.send('<h1>post data!!');
			//res.send(req.body.title);
			res.send(req.headers["content-type"]);
			console.log(req.headers["content-type"]);
			const newTodo = {
				title: req.body.title,
				completed: req.body.completed,
				priority: req.body.priority,
				editing: req.body.editing
			}
			collection.insertOne(newTodo);
		})
		
	}
});



app.get('/', function(req, res) {
  res.send('<h1>Welcome to Todo Web Application!!')
})

app.listen('3000', function() {
  console.log('Server Running!!')
})