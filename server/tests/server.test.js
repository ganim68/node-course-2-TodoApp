const expect =require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./../server');
const {Todo}=require('./../models/todo.js');

var toDos =[
    {_id : new ObjectID() ,text :'First todo'},
    {_id : new ObjectID() ,text :'Second todo'}
];
/*beforeEach(function (done) {
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
});*/

describe('GET /todo/:id',function () {
    it('Should return todo doc',function (done) {
        //this.timeout(10000);
        request(app)
            .get('/todos/5ab003e1c8539523389bf574')
            .expect(200)
            .expect(function (res) {
                expect(res.body.todo.text).toBe(toDos[0].text);
            })
            .end(done);
    });

    it('Sould return 404 if todo not found',function (done) {
        var hexId= new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
    it('Sould return 404 for non-nobject ID',function (done) {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});