const {MongoClient , ObjectID} = require('mongodb'); //MongoClient and objectID are cnstants equal to
// the equivalent mongodb properties

const assert = require('assert');

const url = 'mongodb://localhost:27017';  // Connection URL

const dbName = 'Users';  // Database Name

//---------------------MongoDB Version 3.0.0 rc-0 ------------------
//--------------------Use connect method to connect to the server--------------
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    if(err)
        return console.log('Unable to connect to MongoDB server');

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    //Useing findOneAndUpdate to find a document by _id and update it

    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectID ("5aaabc0906ec140ea0b27f53")
    // }, {
    //     $set: { completed :true}
    // },{
    //     returnOriginal : false
    // }).then(function (result) {
    //     console.log(result)
    // });

    db.collection('Users').findOneAndUpdate({
        _id : new ObjectID ("5aa7d11a44b6a01e50ad3b09")
    }, {
        $set: { name : 'Ganim'} ,
        $inc: {age : 1}
    },{
        returnOriginal : false
    }).then(function (result) {
        console.log(result)
    });

    // client.close();
});
