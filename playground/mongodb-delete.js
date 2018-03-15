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

    // //deleteMany
    // db.collection('Todos').deleteMany({text : 'To eat lunch'}).then(function (result) {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text : "Eat lunch" }).then(function (result) {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed : false}).then(function (result) {
    //     console.log(result);
    // });

    // deleteMany (Users)
    db.collection('Users').deleteMany({name : 'Ganim'}).then(function (result) {
       console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id : new ObjectID('5aa7d13275bc9d121c9d2cba')
    }).then(function (result) {
        console.log(result);
    })
    // client.close();
});
