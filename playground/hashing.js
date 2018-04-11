const {SHA256}=require('crypto-js');
const bcrypt=require('bcryptjs');

 var password ='123abc!';
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//     });
// });

var hashedpassword='$2a$10$Aij7TpakQd.AxTAyfrvkr./Q/Pv3OmDputFB.Dn48BnMrWVZHczri'
bcrypt.compare(password,hashedpassword,(err,res)=>{
    console.log(res);
});
// var data={
//             id :10
//          };
// var token = jwt.sign(data,'123abc');
// console.log(`Token :${token}`);
// var decoded =jwt.verify(token,'123abc');
// console.log('Decoded :',decoded);

// var message ='I am user number 3';
// var hash=SHA256(message).toString();
// console.log(`message :${message}`);
// console.log(`Hash :${hash}`);