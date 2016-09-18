"use strict";

var client = require("artifacia");
var constants = require('./constants.js');


var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var api_key = constants.api_key;
client.artifacia(api_key);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4040;        // set our port


var router = express.Router();

router.get('/:prod_id', function (req, res) {

    console.log(req.params.prod_id);

    var sample_prod_id = req.params.prod_id;
    var num = 5;
    var filters = { 'category': 1, 'pattern': 1 };

    var result = client.get_visual_recommendation(sample_prod_id, num, filters, function (result) { 
        res.json(result);
    });


});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', router);

// Add headers



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// var sample_data = require("./data.json");
// client.upload_item_data(sample_data,function(result){console.log(result)});
