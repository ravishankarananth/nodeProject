/**
 * Created by ravi on 7/2/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    var obj = {"heart": "beat"};
    res.json(obj);
});

module.exports = router;
