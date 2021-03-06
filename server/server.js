const _ = require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}= require('mongodb');

const mongoose=require('./db/mongoose.js').mongoose;
const {Todo}=require('./models/todo.js');
const {User}= require('./models/user.js');
const {authenticate} = require('./middleware/authenticate');

const Port=process.env.PORT||3001;

const app=express();
app.use(bodyParser.json());

//POST (Create) todos
app.post('/todos',function (req ,res) {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then(function (doc) {
        res.send(doc);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});

//POST (Create) users
app.post('/users',function (req ,res) {
    var body = _.pick(req.body , ['email', 'password']);
    var user=new User(body);
    user.save().then(function () {
        return user.generateAuthToken();
           }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    })
});

//Get/users/me
app.get('/users/me',authenticate,function (req,res) {
    res.send(req.user);
});

// GET all todos
app.get('/todos',function (req,res) {
    Todo.find().then(function (todos) {
       res.send({todos});
    },function (e) {
        res.status(400).send(e);
    });
});


// GET todos by ID
app.get('/todos/:id',function (req ,res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send('ID is not valid');
    Todo.findById(id).then(function (todo) {
        if(!todo)
            return res.status(404).send('ID not found');
        res.send({todo});
    }).catch(function (e) {
        res.status(400).send();
    });
});

// Delelte todos
app.delete('/todos/:id',function (req,res) {
    var id = req.params.id;                     //get te ID from tha URL
    if (!ObjectID.isValid(id))                  //Check if the ID is valid
        return res.status(404).send('ID is not valid');
    Todo.findByIdAndRemove(id).then(function (todo) {
        if(!todo)
            return res.status(404).send('ID not found');
        res.send({todo});
    }).catch(function (e) {
        res.status(400).send();
    });
    }) ;
//Update todos
app.patch('/todos/:id',function (req,res) {
    var id = req.params.id;                     //get te ID from tha URL
    var body = _.pick(req.body , ['text', 'completed']);
    if (!ObjectID.isValid(id))                  //Check if the ID is valid
        return res.status(404).send('ID is not valid');
    if (_.isBoolean(body.completed) && body.completed)
        body.completedAt=new Date().getTime();
    else
        {
            body.completed= false;
            body.completedAt = null;
        }
    Todo.findByIdAndUpdate(id , {$set : body} , {new : true}).then(function (todo) {
        if(!todo)
            return res.status(400).send();
        res.send({todo});
    }).catch(function (e) {
        res.status(400).send();
    })
}) ;

app.listen(Port,function () {
   console.log(`Start listening on port : ${Port}`);
});
 module.exports= {
     app : app
 };