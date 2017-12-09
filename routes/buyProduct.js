/**
 * Created by ravi on 7/27/17.
 */
var express = require('express');
var pool = require("./connectionPool");
var router = express.Router();
var es = require("./esConnect");

router.post('/', function(req, res, next) {

   if(req.session.login) {
    var counter = 0;
        var prodArr = [];
        var products = req.body.products;
        for( var i =0; i < products.length; i++){
            prodArr[i] = String(products[i].asin);
        }



    var productString ="";
        prodArr.forEach(function(item){
        es.search({
            index: 'products',
            type: 'flipkart',
            body: {
                "query" : {
                    "constant_score" : {
                        "filter" : {
                            "terms" : {
                                "asin" : prodArr
                            }
                        }
                    }
                }

            }
        }, function (error, response) {


            if(response.hits.hits.length == 0 || response.hits.hits.length != prodArr.length){
                var obj = {"message": "There are no products that match that criteria"};
                console.log(obj);
                res.json(obj);
            }else {
                var prodName = "";
                var asinno ="";
                for(var i = 0; i < response.hits.hits.length ; i++){
                    prodName += String(response.hits.hits[i]._source.title) + "~";
                    asinno += String(response.hits.hits[i]._source.asin) + "~";
                }
                prodName = prodName.substr(0,prodName.length -1);
                asinno = asinno.substr(0,asinno.length -1);

                var sql = "INSERT INTO productBuy (username, productName, asin) VALUES ('"+req.session.username+"','"+ prodName+"','" +
                    asinno+"')";
                pool.query(sql,function(err, result){
                    if(err){
                        var obj = {"message":"The action was successful"};
                        console.log(obj);
                        res.json(obj);
                    }else{

                    var obj = {"message":"The action was successful"};
                    console.log(obj);
                    res.json(obj);}

                });


            }
            // ...
        });

    })



    }else{
        var obj = {"message": "You are not currently logged in"};
        console.log(obj);
        res.json(obj);
    }

});


module.exports = router;

