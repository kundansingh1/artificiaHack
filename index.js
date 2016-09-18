"use strict";

var client = require("artifacia");
var constants = require('./constants.js');

var api_key = constants.api_key;
client.artifacia(api_key);

// var sample_data = require("./data.json");
// client.upload_item_data(sample_data,function(result){console.log(result)});


var sample_prod_id = 2;
var num = 4;
var filters = { 'category': 1, 'pattern': 1 };
client.get_visual_recommendation(sample_prod_id, num, filters, function (result) { console.log(result) });