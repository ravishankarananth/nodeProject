/**
 * Created by ravi on 6/18/17.
 */
var express = require('express');
var pool = require("./connectionPool");
var router = express.Router();
var es = require("./esConnect");

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("register user functions");
});

router.post('/', function(req, res, next) {

    if(req.session.login) {

        if (req.session.isadmin) {



                var asinno = req.body.asin;
                var productName = req.body.productName;
                var productDescription = req.body.productDescription;
                var group = req.body.group;

            // index a document
            es.index({
                index: 'products',
                type: "post",
                id: asinno,
                body: {
                    asin: asinno,
                    prodcutName: productName,
                    productDescription: productDescription,
                    group: group
                }
            }, function (err, resp) {
                if(err){

                    var obj = {"message": "The input you provided is not valid"};
                    console.log(obj);
                    res.json(obj);
                }else{
                    var obj = {"message": productName + " was successfully added to the system"};
                    console.log(obj);
                    res.json(obj);
                }
            });

                /*
                var sql = "UPDATE productDetails SET productName = ?, productDesc= ?, productGroup= ? WHERE asin ='" +asinno +"'";

                pool.query(sql,[productName, productDescription, group], function (err, result) {
                    if (err) {
                        var obj = {"message": "The input you provided is not valid"};
                        console.log(obj);
                        res.json(obj);
                    } else {

                        var obj = {"message": productName + " was successfully updated"};
                        console.log(obj);
                        res.json(obj);
                    }

                });
                */



        } else {
            var obj = {"message": "You must be an admin to perform this action"};
            console.log(obj);
            res.json(obj);
        }
    } else{
        var obj = {"message": "You are not currently logged in"};
        console.log(obj);
        res.json(obj);
    }

});

module.exports = router;