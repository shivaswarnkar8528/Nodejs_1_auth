const express=require('express');
const app=express();
const dotenv=require('dotenv');
const bcrypt=require('bcryptjs');
dotenv.config();
const {mongoose}=require('./config/db');
const auth=require('./config/auth');
const User = require('./models/user');
app.use(express.json());
app.post('/api/v1/register',auth.register);
app.post('/api/v1/login',auth.login);
app.get('/api/v1/users',(req,res)=>{
     User.findOne().then((user)=>{
        user.password=bcrypt.decrypt(user.password);
        res.status(200).json({user,success:true});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({success:false});
    });
});

app.listen(3000,()=>console.log('Server started on port 3000'));