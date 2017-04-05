/**
 * Created by valeriy on 20.03.17.
 */
module.exports = {
   var MongoClient = require('mongodb').MongoClient;

// Connect to the db
    MongoClient.connect("mongodb://localhost:27017/taxer", function(err, db) {
        if(!err) {
            console.log("We are connected");
        }
    });
};