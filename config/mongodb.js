const MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://ganyamm:ganyamm@cluster0.orw9j.mongodb.net/ProductDB?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true,});

var collection;

module.exports = {

    connect: function(callback){
        
        MongoClient.connect(uri)
            .then(function(client){
                console.log("connected once again");
                collection = client.db('ProductDB').collection('Products');
                return callback("ok");
            })
            .catch(function(err){
                console.log(err);
            })
    },

    getCollection: function () {
        return collection;
    }


}

