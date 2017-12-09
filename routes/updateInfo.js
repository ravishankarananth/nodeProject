/**
 * Created by ravi on 6/3/17.
 */
var express = require('express');
var router = express.Router();
var pool = require("./connectionPool");

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("update user");
});

router.post('/', function(req, res, next) {


    if( req.session.login && !req.session.isadmin ) {



            var sqlquery = "UPDATE userDetails SET ";


            if (req.body.address)
                sqlquery = sqlquery + "address = '" + req.body.address + "', ";

            if (req.body.city)
                sqlquery = sqlquery + "city = '" + req.body.city + "',";

            if (req.body.email)
                sqlquery = sqlquery + "email = '" + req.body.email + "',";

            if (req.body.fname)
                sqlquery = sqlquery + "firstname = '" + req.body.fname + "',";

            if (req.body.lname)
                sqlquery = sqlquery + "lastname = '" + req.body.lname + "',";

            if (req.body.password)
                sqlquery = sqlquery + "password = '" + req.body.password + "',";

            if (req.body.state)
                sqlquery = sqlquery + ", state = '" + req.body.state + "',";

            if (req.body.username)
                sqlquery = sqlquery + ", username = '" + req.body.username + "',";

            if (req.body.zip)
                sqlquery = sqlquery + ", zip = '" + req.body.zip + "',";

            sqlquery = sqlquery.substring(0, sqlquery.length - 1) + " WHERE username = '" + req.session.username + "';"


            pool.query(sqlquery, function (err, result) {
                if (err) {
                    var obj = {"message": "The input you provided is not valid"};
                    res.json(obj);
                } else {
                    if(req.body.username){
                        req.session.username = req.body.username;
                    }
                    var obj = {"message": req.session.username + " your information was successfully updated"};
                    res.json(obj);
                }

            });

    } else {
        var obj = { "message":"You are not currently logged in"};
        res.json(obj);
    }
});

module.exports = router;