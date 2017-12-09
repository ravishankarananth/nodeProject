/**
 * Created by ravi on 6/3/17.
 */
/**
 * Created by ravi on 6/3/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("multiply function");
});

router.post('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    if( req.session.login == "true") {
        req.session.login = undefined;
        req.session.admin = undefined;
        var obj = { "message":"You have been successfully logged out"};
        res.json(obj);

    } else {
        var obj = { "message":"You are not currently logged in"};
        res.json(obj);
    }

});

module.exports = router;