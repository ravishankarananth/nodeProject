/**
 * Created by ravi on 7/27/17.
 */
var express = require('express');
var pool = require("./connectionPool");
var router = express.Router();
var HashMap = require('hashmap');

router.post('/', function(req, res, next) {
    if (req.session.login) {

        var sql = "select asin from productBuy where asin LIKE '%"+ String(req.body.asin)+"%'";
        pool.query(sql ,function (err, rows) {

            if (rows.length==0) {

                {var obj = {"message": "There are no recommendations for that product"};
                console.log(obj);
                res.json(obj);
                }
            }else{

                var map = new HashMap();
                for(var i = 0; i < rows.length; i ++) {
                    var temp = rows[i].asin.split("~");


                    for(var j =0; j < temp.length; j++){
                        if(temp[j]!=req.body.asin){
                            if(map.has(temp[j])){
                                var count = map.get(temp[j]);
                                map.set(temp[j], count+1);
                            }else{
                                map.set(temp[j], 1);
                            }
                        }

                    }
                        var sortable = [];
                        for (var prod in  map.keys()) {
                            sortable.push([prod, map[prod]]);
                        }
                        if(sortable.length==0) {
                            var obj = {"message": "There are no recommendations for that product"};
                            console.log(obj);
                            res.json(obj);
                        }else {
                        sortable.sort(function (a, b) {
                            return a[1] - b[1];
                        });
                        var size = sortable.length;
                        if (size > 5) {
                            size = 5;
                        }
                        var result = []
                        for (var k = 0; k < size; k++) {
                            result.push({"asin": sortable[k]});
                        }

                        res.json({message: "The action was successful", products: result});
                    }

                }

            }
        });


    }else{
        var obj = {"message": "You are not currently logged in"};
        console.log(obj);
        res.json(obj);
    }
});
module.exports = router;