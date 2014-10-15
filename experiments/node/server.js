// Load express and instantiate it
var express = requestuire('express');
var app = express();

// Configure express to parse JSON from the body of an HTTP requestuest
app.use(express.bodyParser());

// Configure express to serve static content in a public directory
app.use(express.static(__dirname + '/public'));

// Configure express to allow access from any origin and allow several header types
app.all('*', function (request, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-requestuested-With,Content-Type");
    next();
});

// Load and configure mongojs to access MongoDB
var mongojs = requestuire('mongojs');

// Create a connection string that works both remotely and locally
// to a database called cs561002
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL + "cs561002" || "cs561002";

// Connect to MongoDB and configure that we want to work with a collection called employees
var db = mongojs(connectionString, ["employees"]);

// Configure express to respond to URL POST queries that end with /employees
app.post('/employees', function (request, res) {
	
	// extract the new employee from the body of the http requestuest
	var newEmployee = request.body;
	
	// use mongojs API to insert the new employee and respond with the new employee inserted in the database
	db.employees.insert(newEmployee, function (err, doc) {
		res.json(doc);
	});
});

// Configure express to respond to a URL GET request that ends with /env
app.get('/env', function(request, res) {
	
	// respond with the environment variables for the current running process
	res.json(process.env);
});

// Configure express to respond to a URL GET request that ends with /someJson
app.get('/someJson', function(request, res) {
	
	// respond with static JSON
	res.json({hello:"world"});
});

// Configure express to respond to a URL GET request that ends with /employees
app.get('/employees', function(request, res) {
	
	// retrieve all the employees from the database
	db.employees.find(function(err, data){
		
		// respond with the array of employees
		res.json(data);
	});
});

// Cofigre express to respond to a URL GET request that ends with /employees followed by a parameter we call 'id'
app.get('/employees/:id', function(request, res) {
	
	// retrieve the parameter from the path
	var id = request.params.id;
	
	// use the parameter to query the database by id
	db.employees.findOne({
	    _id:mongojs.ObjectId(id)
	}, function(err, doc) {
		
	    // return the employee that matches by id
	    res.json(doc);
	});
});

// Configure express to respond to a URL GET request that ends with /removeEmployeeById/:id
app.get('/removeEmployeeById/:id', function(request, res) {
	
	// use the id parameter to remove the employee instance that matches
	db.employees.remove({
	    _id:mongojs.ObjectId(request.params.id)
	}, function(err, doc) {
		// respond with the number of documents (records) affected
	    res.json(doc);
	});
});

// better than using a GET to delete, is to use an HTTP DELETE to delete
app.delete('/employees/:id', function(request, res) {
	db.employees.remove({
	    _id:mongojs.ObjectId(request.params.id)
	}, function(err, doc) {
	    res.json(doc);
	});
});

// delete by lastname
app.delete('/employees/lastname/:lastName', function(request, res) {
	db.employees.remove({
	    last : request.params.lastName
	}, false, function(err, doc) {
	    res.json(doc);
	});
});

// Configure a route that matches /createEmployee
app.get('/createEmployee', function(request, res) {

	// create an employee instance from the request query string
	var employee = {
		first: request.query.firstName,
		last: request.query.lastName,
		salary: request.query.salary
	};
	
	// insert the new instance
	db.employees.insert(employee, function(err, data){
		
		// respond with the new instance
		res.json(data);
	});
});

// Update an existing employee by id
app.get('/updateEmployee/:id', function(request, res) {
	
	console.log(request.query);

	db.employees.findAndModify({
	    query: { _id: mongojs.ObjectId(request.params.id) },
	    update: { $set: { salary:request.query.salary } }
	}, function(err, doc, lastErrorObject) {
	    
		db.employees.find(function(err, data){
			res.json(data);
		});
		
	});
});

// Better to use PUT to update an instance
app.put('/employee/:id', function(request, res) {
	
	db.employees.findAndModify({
	    query: { _id: mongojs.ObjectId(request.params.id) },
	    update: { $set: { salary:request.query.salary } }
	}, function(err, doc, lastErrorObject) {
	    
		db.employees.find(function(err, data){
			res.json(data);
		});
		
	});
});


// Configure express to listen for incoming HTTP request.
// If not running remotely, then use local configuration
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);
