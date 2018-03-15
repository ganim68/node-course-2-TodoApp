//const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb');  //Identical to the above statment (ES6 Syntacs)
const {MongoClient , objectID} = require('mongodb'); //MongoClient and objectID are cnstants equal to
// the equivalent mongodb properties
//const objectID =require('mongodb').objectID;
const assert = require('assert');

var user={name:'Ganim',age:25};
var {name}=user;
console.log(name);

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

             //  Insert to "Todos"

    // const collection = db.collection('Todos');
    // collection.insertOne({
    //     text : 'Someting to do' ,
    //     completed : false
    // } , (err,result) =>{
    //     if(err)
    //         return console.log('Unable to insert Todo , err);
    //     console.log(JSON.stringify(result.ops , undefined ,2));
    // });

             //  Insert to "Users"
    // const collection = db.collection(dbName);
    //     collection.insertOne({
    //         //_id : 123 ,
    //         name : 'Ganim' ,
    //         age : 49 ,
    //         location : 'Horfish'
    //     } , (err,result) =>{
    //         if(err)
    //             return console.log('Unable to insert user' , err);
    //         console.log(result.ops[0]._id.getTimestamp());
    //     });

   // client.close();
});


//                    MongoDB Version 2.2
//                  Use connect method to connect to the server

// MongoClient.connect(url,(err , db)=>{
//     if(err){
//         return console.log('Unable to connect to MongoDB server');
//     }
//
//     console.log('Connected to MongoDB server');
//
//     db.close();
// });