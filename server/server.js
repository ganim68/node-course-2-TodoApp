const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}= require('mongodb');

const mongoose=require('./db/mongoose.js').mongoose;
const {Todo}=require('./models/todo.js');
const {User}= require('./models/user.js');

const Port=process.env.PORT||3001;

const app=express();
app.use(bodyParser.json());
app.post('/todos',function (req ,res) {
    var todo=new Todo({
        text : req.body.text
    });
    todo.save().then(function (doc) {
        res.send(doc);
    })
},function (e) {
    res.status(400).send(e);
});

app.get('/todos',function (req,res) {
    Todo.find().then(function (todos) {
       res.send({todos});
    },function (e) {
        res.status(400).send(e);
    });
});


// GET todos
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


app.listen(Port,function () {
   console.log(`Start listening on port : ${Port}`);
});
 module.exports= {
     app : app
 };