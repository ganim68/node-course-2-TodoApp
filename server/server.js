var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}= require('mongodb');

var mongoose=require('./db/mongoose.js').mongoose;
var {Todo}=require('./models/todo.js');
var {User}= require('./models/user.js');

var Port=3001;

var app=express();
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



app.listen(Port,function () {
   console.log(`Start listening on port : ${Port}`);
});
 module.exports= {
     app : app
 };