var mongoose =require('mongoose');
var ev = require('dotenv').config()
key =ev.parsed.API_KEY;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(key);
var Article = require('./models/article');
var express = require('express');
var bodyParser = require('body-parser')

var server = express();

server.use(bodyParser.json())

// ---- ---- ---- MONGODB Connection ---- ---- ---- ---- ---- //


mongoose.connect('mongodb://localhost/news',{ useNewUrlParser: true , useUnifiedTopology: true }) ;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
//To Clear Data Base

function clear(){
    Article.deleteMany({},function(err){
        console.log(err);
    })
}

db.once('open',function(){
    clear();
})


//----- ---- ---- ---- NEWS API---- ---- ----- ----- ---- ----//


function query_on_everything(query)
{
newsapi.v2.everything({
    q:query,
    language:''

}).then(response =>{
    return (response.articles);
    }).catch(err =>{
        console.log(err);
        }
    )
}
function query_on_headlines(cntry ,cat , quer){
    let em = '';
    cntry = cntry || em;
    cat = cat || em;
    quer = quer || em;
    console.log(quer)
    return newsapi.v2.topHeadlines({
        country:cntry,
        category:cat,
        q:quer,
        language:'en'
    })
}
// console.log(query_on_headlines());


// check('in',null,'corona');


// ---- ---- ---- ---- TO SAVE DATA IN MongoDB---- --- ---- ---- //


function condense(x){
    y ={
        source_name : x.source.name,
        author:x.author || x.source.name,
        title:x.title,
        publishedat: x.publishedAt,
        url:x.url,
        imageUrl:x.urlToImage,
        description:x.description,
        content:x.content
}
return y;
}

function save_data(arr){
 arr.forEach(element => {
    element = condense(element);
    // console.log(element);
 });
 clear();
 Article.insertMany(arr, function(err,docs){
    //  console.log(docs);
    if (err){
        console.log(err);
    }
 })
}

// Article.find({author:'PTI'} , function(err,docs){
//     return docs;
// }).then(news => {
//     console.log(news.length)
// })

/// --------- ------------------- -------------- Routing and EndPoint definition ---------------- -------------------- -----------------///
// function check(cntry,cat,quer){
//     query_on_headlines(cntry ,cat , quer).then(response =>{
//         let x = response.articles;
//         save_data(x);
//         // console.log("got it");

//     }).catch(err =>{
//         console.log(err);
//     })
//   ;
// };

server.post('/',function(req,res){
    var con = req.body;
    query_on_headlines(con.country,con.category,con.query).then(response =>{
        let x = response.articles;
        // console.log(x);
        save_data(x);
    }).catch(err=>{
        console.log(err);
    })
    
    Article.find().lean().exec(function(err,docs){
        return res.end(JSON.stringify(docs));
    })

    // res.sendStatus(200);
});


server.listen(8080 ,()=>{
    console.log("running on 8080");
});