var express=require("express");
var session = require("express-session") 
var bodyParser=require('body-parser');
const cors=require('cors')
var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var path = require('path');
var connection = require('./config');


var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/copyregister');
var boxdatabases = require('./controllers/boxdatabase')
var boxdetail = require('./controllers/boxdetail')

app.post('/register', registerController.register);

app.get('/',function(req,res){
      
})
app.post('/login', authenticateController.authenticate);
app.post('/boxdatabase',boxdatabases.dbapi);
app.post('/boxdetail',boxdetail.boxdetail);

app.listen(8012);