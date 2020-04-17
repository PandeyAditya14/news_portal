var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    source_name:{ type : String},
    author:{type: String},
    title:{type : String},
    publishedat:{type : Date},
    url:{type: String},
    imageUrl:{type : String},
    description:{type: String},
    content:{type: String}


});

module.exports = mongoose.model('Article',ArticleSchema);