const expect =require('expect');
const request = require('supertest');

const {app}=require('./../server');
const {Todo}=require('./../models/todo.js');
const toDos =[
    {text :'First todo'},
    {text :'Second todo'}
];
beforeEach(function (done) {
    Todo.remove({}).then(function () {
      return Todo.insertMany(toDos);
   }).then(function () {
        done();
    });
});

describe('POST/todos',function () {
   it('Sould create a new todo',function (done) {
     var text = 'Test todo text';

     request(app)
         .post('/todos')
         .send({text})
         .expect(200)
         .expect(function (res) {
           expect(res.body.text).toBe(text);
         })
         .end(function (err,res) {
             if(err)
                 return done(err);

             Todo.find({text}).then(function (toDos) {
                 expect(toDos.length).toBe(1);
                 expect(toDos[0].text).toBe(text);
                 done();
             }).catch(function (e) {
                 done(e);
             });
         });
   });

   it('Should not create todo with invalid body data',function (done) {

       request(app)
           .post('/todos')
           .send({text : ''})
           .expect(400)
           .end(function (err,res) {
               if(err)
                   return done(err);

               Todo.find().then(function (toDos) {
                   expect(toDos.length).toBe(2);

                   done();
               }).catch(function (e) {
                   done(e);
               });
           });
   });
});