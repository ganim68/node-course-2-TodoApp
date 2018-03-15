const {MongoClient , ObjectID} = require('mongodb'); //MongoClient and objectID are cnstants equal to
                                                    // the equivalent mongodb properties


const assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Users';

//---------------------MongoDB Version 3.0.0 rc-0 ------------------
//--------------------Use connect method to connect to the server--------------
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    if(err)
        return console.log('Unable to connect to MongoDB server');

    console.log("Connected successfully to server");
    const db = client.db(dbName);
    db.collection('Users')
        .find({
        name : "Ganim"})
        .toArray().then(function(docs){
        console.log('Todos')
        console.log(JSON.stringify(docs , undefined ,2));
    },function(err){
        console.log('Unable to fech Todos');
    });

   // client.close();
});
