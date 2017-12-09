/**
 * Created by ravi on 6/17/17.
 */
var express = require('express');
var router = express.Router();
var pool = require("./connectionPool");
/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("register user functions");
});

router.post('/', function(req, res, next) {


    if(req.body.fname == "" || req.body.lname == "" || req.body.address == "" || req.body.city == "" || req.body.state == ""
        || req.body.zip == "" || req.body.email == "" || req.body.username == "" || req.body.password == "" ||
        req.body.fname == undefined || req.body.lname == undefined || req.body.address == undefined || req.body.city == undefined || req.body.state == undefined
        || req.body.zip == undefined || req.body.email == undefined || req.body.username == undefined || req.body.password == undefined){
        res.json({message:"The input you provided is not valid"});

    }else{

        req.body.city = req.body.city.replace(/[\u0800-\uFFFF]/g, '');
        req.body.state = req.body.state.replace(/[\u0800-\uFFFF]/g, '');

    // if(req.body.address){
    //     req.body.address = req.body.address.replace(/['\u0800-\uFFFF]/g, '');
    //     var address = req.body.address;
    // }
    // if(req.body.city != null)
    // {req.body.city = req.body.city.replace(/['\u0800-\uFFFF]/g, '');
    // var city = req.body.city;
    // }
    // if(req.body.email)
    // {req.body.email = req.body.email.replace(/['\u0800-\uFFFF]/g, '');
    // var email = req.body.email;
    // }
    // if(req.body.fname)
    // {req.body.fname = req.body.fname.replace(/['\u0800-\uFFFF]/g, '');
    // var fname = req.body.fname;}
    // if(req.body.lname)
    // {req.body.lname = req.body.lname.replace(/['\u0800-\uFFFF]/g, '');
    // var lname = req.body.lname;}
    // var password = req.body.password;
    // if(req.body.state != null)
    // {req.body.state = req.body.state.replace(/['\u0800-\uFFFF]/g, '');
    // var state = req.body.state;}

    var username = req.body.username;
    var zip = req.body.zip;
    var isadmin = 0;



            var sql = "INSERT INTO userDetails (username, password, firstname, lastname, address, city, state, zip, email, isadmin) VALUES (?,?,?,?,?,?,?,?,?,?)";

            pool.query(sql, [req.body.username, req.body.password ,req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.email, Number(0)], function (err, result){
                if (err){
                    console.log("here");
                    console.log(err);
                    var obj = {"message": "The input you provided is not valid"};

                    res.json(obj);
                }else{

                    var obj = {"message": req.body.fname +" was registered successfully"};
                    console.log(obj);
                    res.json(obj);
                }

            });



    }





});

module.exports = router;