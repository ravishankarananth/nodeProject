/**
 * Created by ravi on 7/25/17.
 */
var aws_access_key = 'AKIAJBET6LF6S7SVDVCA';
var aws_secret_key = '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';

// configure the region for aws-sdk
var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.Credentials(aws_access_key, aws_secret_key)
});

// create an elasticsearch client for your Amazon ES
var es = require('elasticsearch').Client({
    hosts: [ 'https://search-products-h4posqowtzh7kdeflheu4ivsfi.us-east-1.es.amazonaws.com' ],
    connectionClass: require('http-aws-es')
});

module.exports = es;

