const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
// here only we will create the schema
name:{
    type:String,
    requried:true,

},
email:{
    type:String,
    requried:true,
    unique:true
},
password:{
    type:String,
    requried:true,
    
},
isAdmin: { type: Boolean, default: false }  // Admin Flag
,
date:{
   type:Date,
   default:Date.now//if date not specified  then in tat time it will run for mongo db
}
});

const User=mongoose.model('user',userSchema)//creating a table and giving name and exporting it

// User.createIndexes();

module.exports=User//creating a table and giving name and exporting it
