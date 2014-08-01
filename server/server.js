var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	restful = require('node-restful'),
	mongoose = restful.mongoose;

var app = express();


	app.use(bodyParser.json());
	app.use(methodOverride());


mongoose.connect('mongodb://localhost/restful');

var GoogleFiberSchema = mongoose.Schema({
	name: String,
	address: String,
	city: {type: String, default: "Raleigh"},
	state: {type: String, default: "NC"},
	zip: {type: Number, default: null},
	geometry: {type: Object, default: null}
});

var Fiber = restful.model('fiber', GoogleFiberSchema);

Fiber.methods(['get', 'put', 'post', 'delete']);
Fiber.register(app, '/raleigh/api/fiber');



app.listen(3000);
console.log('Raleigh Fiber API listening on Port 3000');