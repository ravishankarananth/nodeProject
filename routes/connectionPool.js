/**
 * Created by ravi on 7/1/17.
 */
var mysql = require("mysql");
// var pool = mysql.createPool({connectionLimit : 100, //important
//     host     : 'localhost',
//     user     : 'remote',
//     password : 'remote_pass',
//     database : 'flipkart',
//     debug    :  false,
//     charset: "utf8_general_ci"
//
// });
var pool = mysql.createPool({connectionLimit : 500, //important
    host     : 'koodi.cdejsfnpkg6q.us-east-1.rds.amazonaws.com',
    port    : '3306',
    user     : 'remote',
    password : 'remote_pass',
    database : 'flipkart',
    debug    :  false,
    charset: "utf8_general_ci"

});
module.exports = pool;
