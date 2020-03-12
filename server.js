// calling express library
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

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
		 // lists the databases that exist in the deployment
			// db.db('example').admin().listDatabases(function(err, dbs) {
			// 		console.log(dbs.databases);
			// 		db.close();
			// });
	}
});

// app.route('/').get(function(req, res) {
//    MongoClient.connect(url, function(err, db) {
// 		useNewUrlParser: true;
// 		useUnifiedTopology: true;
//       //  var collection = db.getCollectionNames();
//       //  var cursor = collection.find({});
// 			//  str = "";
// 			 console.log(db);
//       //  collection.forEach(function(item) {
//       //      print(item);
//       //  }, function(err) {
//       //      res.send(err);
//       //      db.close();
//       //     }
//       //  );
//    });
// });

//var server = app.listen(8080, function() {});
// GET request
app.get('/', function(req, res) {
  res.send('<h1>Welcome to Todo Web Application!!')
})

// app.get('/data', function(req, res) {
// 	res.json(todos);
//   //res.send('<h1>Todo data page!!')
// })

app.listen('3000', function() {
  console.log('Server Running!!')
})