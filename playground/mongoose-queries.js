const {ObjectID}= require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

var id = 'aabf36941ab8d1914beefbc22';

User.find({_id :id}).then(function (users) {
    if(users.length)
        console.log('Users' , users);
});

User.findOne({_id : id}).then(function (user) {
    if(user)
        console.log('User' , user);
});

User.findById(id).then(function (user) {
    if(!user)
        return console.log('ID not found');
    console.log('User By Id',JSON.stringify(user ,undefined ,2));
}).catch(function (e) {
    console.log(e);
});

// var id = '5aaf8a63bc8dc70bc492057122';
// if (!ObjectID.isValid(id))
//     console.log('ID is not valid');

// // Todo.find({
// //     _id : id}).then(function (todos) {
// //     console.log('Todos',todos);
// // });

// // Todo.findOne({
// //     _id : id}).then(function (todo) {
// //     console.log('Todo',todo);
// // });

// Todo.findById(id).then(function (todo) {
//     if (!todo)
//         return console.log('id is not found');
//     console.log('Todo By Id',todo);
// }).catch(function (e) {
//     console.log(e);
// });