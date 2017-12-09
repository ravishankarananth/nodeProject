/**
 * Created by ravi on 7/27/17.
 */
var express = require('express');
var pool = require("./connectionPool");
var router = express.Router();
var HashMap = require('hashmap');

router.post('/', function(req, res, next) {
    if(req.session.login) {

        if (req.session.isadmin) {

            var sql = "select productName from productBuy where username = ?";
            pool.query(sql,[req.body.username], function (err, rows) {
                if (err) {
                    var obj = {"message": "There are no users that match that criteria"};
                    console.log(obj);
                    res.json(obj);
                } else {
                    if(rows.length==0){
                        var obj = {"message": "There are no users that match that criteria"};
                        console.log(obj);
                        res.json(obj);
                    }
                    var map = new HashMap();
                    for(var i = 0; i < rows.length; i ++) {
                        var temp = rows[i].productName.split("~");
                        for(var j =0; j < temp.length; j++){
                            if(map.has(temp[j])){
                                var count = map.get(temp[j]);
                                map.set(temp[j], count+1);
                            }else{
                                map.set(temp[j], 1);
                            }

                    }
                }
                var prod =[];
                var keyset = map.keys();
                for(var k = 0; k < keyset.length ; k ++){
                prod.push({"productName" : keyset[k],"quantity" : map.get(keyset[k])});
                }
                res.json({message: "The action was successful", products : prod});

            }

            });

        }else {
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