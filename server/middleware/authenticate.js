const {User}= require('./../models/user.js');

var authenticate=(req,res,next) =>{
    var token=req.header('x-auth');
    console.log(token);
    User.findByToken(token).then(function (user) {
        if(!user)
        {
            return Promise.reject();
        }
        req.user=user;
        req.token=token;
        next();
    }).catch(function (e) {
        res.status(401).send('קיימת בעיה');
    });
};
module.exports=
    {
        authenticate : authenticate
    }