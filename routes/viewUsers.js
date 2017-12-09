/**
 * Created by ravi on 6/18/17.
 */
var express = require('express');
var pool = require("./connectionPool");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("view user functions");
});

router.post('/', function(req, res, next) {

    if(req.session.login) {

        if (req.session.isadmin) {



                var sql = "SELECT * from userDetails WHERE isadmin = 0";
                if(req.body.fname){
                    sql = sql + " AND firstname LIKE '%" + req.body.fname +"%'";
                }
                if(req.body.lname){
                    sql = sql + " AND lastname LIKE '%" + req.body.lname +"%'";
                }
                pool.query(sql, function (err, rows) {

                    if (rows.length==0) {
                        var obj = {"message": "There are no users that match that criteria"};
                        console.log(obj);
                        res.json(obj);
                    } else {

                        var obj =[];
                        for(var i=0;i<rows.length; i++){
                            obj.push({"fname":rows[i].firstname,"lname":rows[i].lastname,"userId":rows[i].username});
                        }

                        var result = {"message":"the action was successful", "user":obj};
                        console.log(result);
                        res.json(result);
                    }
            });
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