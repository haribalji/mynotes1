const express=require('express');
const User=require("../models/User");
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');



const router=express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchdata');

// creating a jwt secert key for creating token
const JWT_SECERT="haribalajinvp";


// rout-1 create user not login requried creating newuser 
router.post('/createuser',[
// here only all the checks will be done
body('name',"Enter a valid name").isLength({min:5}),
body('email',"Enter a valid email").isEmail(),
body('password',"password must be atleast  6 characters").isLength({min:6}),

],async (req,res)=>{
         //  obj={
         //     a:"the",
         //     number:34,

         //  }

// checking any erros are there if there exit then return errors ,like format checking , empty or not  
const result = validationResult(req);
let success=false;
if (!result.isEmpty()) {
  return res.status(400).json({success, errors: result.array() });

// return res.send({ errors: result.array() });
}


try{
// check wheather the user is already exit or not
let user =await User.findOne({ email:req.body.email
});
// if user exits it will return that document or entity or it will return null
// if the user already exisit then return error
if(user){
return res.status(400).json({success,error:"sorry a user with this email id is already exisit"})
}

//to ensure that the password must be string 
if (typeof req.body.password !== 'string') {
  return res.status(400).json({ success,error: "Password must be a string" });
}


//  "await " --> it is used it is saying that after exection of each await line only the execution move to the 
// next line 




// now creating the salt
//1--> const salt= await bcrypt.genSalt(10);//10 is the value for more secure and but it process takes time or  slower this process when number is high

//2--> const secpass=await bcrypt.hash(req.body.password,salt );//stroing salt, that kind of thigs will be handled by bcryptjs itself

const secpass = await bcrypt.hash(req.body.password, 10);//the above 1 and 2 combing work done here it self

///creating new user
 user =await User.create({
   name:req.body.name,
   email:req.body.email,
   password:secpass,
   isAdmin: false  // Ensure isAdmin is handled properly

});

// always  the user  id  is considered for playload data which is used to identify the user unique
// const data={
//   id:user.id,
// }as we are considreding the admin panel
const data={
  id:user.id,
  isAdmin: user.isAdmin 
}

const authutoken = jwt.sign(data,JWT_SECERT);//it will return the token by compbining the header +playload+singnature

// res.json(user);//no errors occured then it will send a user as response
success=true;
res.json({success,authutoken});
}catch(error){
console.log(error.message);
res.status(500).send("Internal Server Error");
}
});


// route-2  Authenticate -->login    

router.post('/login',[
    // here only all the checks will be done
    body('email',"Enter a valid email").isEmail(),
    body('password',"password word can't be blank").exists(),//here we are saying that password can't be blank

    
    ],async (req,res)=>{
  // checking any erros are there if there exit then return errors ,like format checking , empty or not  
const result = validationResult(req);
let success=false;
if (!result.isEmpty()) {
return res.status(400).json({ success,errors: result.array() });

}

const {email,password}=req.body;//Here we are performing the destructuring  getting all the values 

// now check whether the user exisit or not
try {
  
  let user =await User.findOne({ email});
if(!user){
  // if user not exisits
  success=false;

  return res.status(400).json({success,error:"Please  try to login with correct credentials"});
}              //This first parameter will hold the string-password and its hash value it will convert automatically     


// const passwordcompare =  bcrypt.compare(password, user.password);

const passwordcompare= await bcrypt.compare(password,user.password); //return true or false
if(!passwordcompare){
  success=false;

  return res.status(400).json({success, error:"Please  try to login with correct credentials"});

}

// always  the user  id  is considered for platload data which is used to identify the user unique
const data={
  id:user.id,
  isAdmin: user.isAdmin 
}

// const authutoken = jwt.sign(data,JWT_SECERT); it is valid only
// //it will return the token by combining the header +playload+singnature
const authutoken = jwt.sign(
  { id: user.id, isAdmin: user.isAdmin }, 
  JWT_SECERT
);
success=true;
res.json({success,authutoken});




 
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
    
}
    });

// Route-3 --- loggedin and getting the user  detail

router.post('/getuser',fetchuser,async (req,res)=>{

// After executw the fetch function  only we will execute the next function

try {
  const userid=req.user.id;
  const user=await User.findById(userid).select("-password");/// Here all the fields will be selected except the password
  return res.send(user);
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
  
}


});

module.exports=router;