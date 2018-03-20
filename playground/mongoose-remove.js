const {ObjectID}= require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

 var delAll=function () // Remove all documents from Todo
     {
         Todo.remove({}).then(function (result) {
             console.log(result);
         });
     };
  delOne =function (str) {
      Todo.findOneAndRemove({text :str}).then(function (todo) {
          console.log(todo);
      }) ;
  }
 delById=function (id)  // Find one document by it's ID and remove it
     {
         Todo.findByIdAndRemove(id).then(function (todo) {
             console.log(todo);
         }) ;
     }

 //delById('5ab044dd2c7dd426d862a621');
delOne('Second todo');

