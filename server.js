/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
 
var cloud = true;
 
var mongodbHost = '127.0.0.1';
var mongodbPort = '3000';
 
var authenticate ='';
//cloud
if (cloud) {
 mongodbHost = 'ds117422.mlab.com';
 mongodbPort = '3000';
 authenticate = 'Rahul Vashist:Skyfall007$'
}
 
var mongodbDatabase = 'world';
 
// connect string for mongodb server running locally, connecting to a database called test
var url = 'mongodb://Rahul:Skyfall007$@ds117422.mlab.com:17422/details';
 
 
// find and CRUD: http://mongodb.github.io/node-mongodb-native/2.0/tutorials/crud_operations/
// aggregation: http://mongodb.github.io/node-mongodb-native/2.0/tutorials/aggregation/
 
MongoClient.connect(url, function(err, db) {
    // assert.equal(null, err);
    console.log("Connected correctly to server.");
    // var cursor = collection.find({});
    // find top 20 countries by  size
    // db.collection('countries').find({},{"sort": [["area",-1]]}).limit(20).toArray(function(err, results){
    // console.log("Country One " +JSON.stringify(results[0])); 
    // console.log("Name of Country Four " +results[3].name+ " and size: " +results[3].area);
 
    //   db.close();
    //   console.log("Connection to database is closed.");
  //  });
 
}) //connect()

*/

var port = 3001;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

//View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname,'client')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port, function(){
    console.log('Server started on port' + port)
});