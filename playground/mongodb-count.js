const {MongoClient , ObjectID} = require('mongodb'); //MongoClient and objectID are cnstants equal to the equivalent mongodb properties

const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

//---------------------MongoDB Version 3.0.0 rc-0 ------------------
//--------------------Use connect method to connect to the server--------------
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    if(err)
        return console.log('Unable to connect to MongoDB server');

    console.log("Connected successfully to server");
    const db = client.db(dbName);

    db.collection('Todos')
        .find()
        .count().then(function(count){
        console.log(`Todos conunt : ${count}`)

    },function(err){
        console.log('Unable to fech Todos');
    });
});
