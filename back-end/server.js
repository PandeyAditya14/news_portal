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
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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
return newsapi.v2.everything({
    q:query,
    language:'en'

})
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
    var y ={
        source_name : "",
        author:"" ,
        title:"",
        publishedat: "",
        url:"",
        imageUrl:"",
        description:"",
        content:""
}
y.source_name =x.source.name;
y.author=x.author;
y.title=x.title;
y.publishedat= x.publishedAt;
y.url=x.url;
y.imageUrl=x.urlToImage;
y.description=x.description;
y.content=x.content;
console.log(y)
return y;
}

function save_data(arr){
 arr.forEach(element => {
    element = condense(element);
    // console.log(element);
 });
 clear();
 

 Article.insertMany(arr, function(err,docs){
    var doc_arr = []
    docs.forEach(x=>{
        doc_arr.push(x)
    })
    console.log(doc_arr)
    if (err){
        console.log(err);
    }

 })


//  Article.find().lean().exec(function(err,docs){
//      console.log(docs)
//  })


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
    var quer = con.category + ' ' + con.query
    console.log(quer)
    if(!quer){
        // console.log("Here")
    query_on_headlines(con.country,null,quer)
    .then(response =>{
        let arr = response.articles;
        // console.log(arr);
        // save_data(x);
        arr.forEach(ele1ment => {
            element = condense(element);
            // console.log(element);
         });
        
         clear();
         
    
        Article.insertMany(arr, function(err,docs){
        var doc_arr = []
        if (err){
            console.log(err);
        }
        else{
        docs.forEach(x=>{
            doc_arr.push(x)
        })
        // console.log(doc_arr)
        return res.end(JSON.stringify(arr));

        }
    
        })

    }).catch(err=>{
        console.log(err);
    })
    }
    else{
        console.log("Here")
        query_on_everything(quer)
        .then(response =>{
        let arr = response.articles;
        // console.log(arr);
        // save_data(x);
        arr.forEach(element => {
            element = condense(element);
            // console.log(element);
         });
        
         clear();
         
    
        Article.insertMany(arr, function(err,docs){
        var doc_arr = []
        if (err){
            console.log(err);
        }
        else{
        docs.forEach(x=>{
            doc_arr.push(x)
        })
        // console.log(doc_arr)
        return res.end(JSON.stringify(arr));

        }
    
        })

    }).catch(err=>{
        console.log(err);
    })
    }
});


server.listen(8080 ,()=>{
    console.log("running on 8080");
});