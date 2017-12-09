/**
 * Created by ravi on 6/3/17.
 */
/**
 * Created by ravi on 6/3/17.
 */
var express = require('express');
var router = express.Router();
var pool = require("./connectionPool");

router.post('/', function (req, res) {


    var post = req.body;

    pool.query('SELECT * FROM userDetails where username = ? AND password = ?',[post.username, post.password] ,function(err,rows){
if(err){
    var obj = {"message": "There seems to be an issue with the username/password combination that you entered"};
    console.log(obj);
    res.json(obj);

}else {

    if (rows.length == 1) {
        req.session.username = post.username;
        req.session.login = "true";
        var obj = {"message": "Welcome " + rows[0].firstname};

        if (Number(rows[0].isadmin) == 1) {
            req.session.isadmin = "true";
        }
        console.log(obj);
        res.json(obj);
    } else {

        var obj = {"message": "There seems to be an issue with the username/password combination that you entered"};
        console.log(obj);
        res.json(obj);
    }

}

    });




});


module.exports = router;