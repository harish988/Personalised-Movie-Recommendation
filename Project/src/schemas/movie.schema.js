var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    movie : {type:String},
    genre : {type:String}
    });

module.exports = mongoose.model('movie',schema);