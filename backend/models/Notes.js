const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
// here only we will create the schema

// I need to create a forign key by which we can collect  each user's notes  by connecting  each user
user:{
    // in user field each user's id will be stored it will be considered as forign key
    type:mongoose.Schema.Types.ObjectId,
    ref :'user'//refering table
}


,


title:{
    type:String,
    requried:true,

},
description:{
    type:String,
    requried:true,
   
},
tag:{//regarding what here we need to mention it
    type:String,
    default:"General"
},
date:{
   type:Date,
   default:Date.now//if date not specified  then in tat time it will run for mongo db
}
});


const Note=mongoose.model('notes',NotesSchema);//creating a table and giving name and exporting it

module.exports=Note;
