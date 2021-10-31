const db = require('../config/mongodb')

var ObjectId = require('mongodb').ObjectID;




exports.add = (product, callback) => {
    const collection = db.getCollection();
    collection.insertOne({ firstname: product.firstname, email: product.email, categoryname: product.categoryname, liner: product.liner, hours: product.hours, Language: product.Language, myfile: product.myfile, message: product.message })
        .then(() => {
            console.log("document inserted");
            
        })
} 



exports.update = (product, callback) => {
    const collection = db.getCollection();
    collection.findOneAndUpdate({ _id: ObjectId(product._id)},
    {
     $set: {firstname: product.firstname, email: product.email, categoryname: product.categoryname, liner: product.liner, hours: product.hours, Language: product.Language, myfile: product.myfile, message: product.message}
    },{})
        .then(() => {
            console.log("document Updated");
            return callback();
            
        })
} 



 
exports.getAll = (callback) => {
    const collection = db.getCollection();
    collection.find().toArray()
        .then((products) => {
            // console.log(products);
            return callback(products);
        });
}

exports.get = (id,callback) => {
    const collection = db.getCollection();
    // console.log(id); 
    collection.findOne({ _id: ObjectId(id) })
        .then((product) => {
            return callback(product);
        });  
}


exports.delete = (id, callback) => {
    const collection = db.getCollection();
    collection.deleteOne({ _id: ObjectId(id) })
        .then((result) => {
            return callback();
        });
}















// exports.getAll = (callback) => {
//     const collection = db.getCollection();
//     collection.find().toArray()
//         .then((products) => {
//             console.log(products);
//             return callback(products);
//         });
// }