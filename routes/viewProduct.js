/**
 * Created by ravi on 6/18/17.
 */
var express = require('express');

var router = express.Router();
var es = require("./esConnect");

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("view product functions");
});

router.post('/', function(req, res, next) {



    if(req.body.asin){
        var asin = String(req.body.asin)
        global.asin = { match: { asin:asin }};
    }
    else
        global.asin = {match_all: {}};


    if(req.body.keyword){
        var key = String(req.body.keyword);
        global.keyword = [ { match_phrase: { description:key }}, {match_phrase: { title:key}}]; //

    }
    else
        global.keyword = {match_all: {}};


    if(req.body.group){
        var grp = String(req.body.group);
        global.group = { match: { categories:grp }};}
    else
        global.group={match_all: {}};

     global.prod =[];

console.log(global.asin);
console.log(global.keyword);console.log(global.group);
    es.search({
        index: 'products',
        type:'flipkart',
        body: {            query: {
            bool: {
                must: [
                    global.asin
                    ,
                    {bool: {
                        should:
                        global.keyword

                    }},
                    global.group
                ]

            }
        }

    }}, function (error, response) {

        if(response.found == 'false'){
            var obj = {"message": "There are no products that match that criteria"};
            res.json(obj);
        }else{
            for(var i=0;i<response.hits.hits.length;i++)
            {
                global.prod.push({"asin":response.hits.hits[i]._source.asin, "productName":response.hits.hits[i]._source.title});
            }
            if(prod.length==0){
                var obj = {"message": "There are no products that match that criteria"};
                res.json(obj);
            }     else{
            var result = {"product":global.prod};
            res.json(result);
            }

        }

    });





});

module.exports = router;