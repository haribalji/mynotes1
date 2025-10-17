const express=require('express');
const fetchuser = require('../middleware/fetchdata');
const Note=require("../models/Notes");
const { body, validationResult } = require('express-validator');

const router=express.Router();
// Route -1 Get all the details of the notes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
     try{   
   const notes=await Note.find({
      user:req.user.id
   })/// Here all the fields will be selected all the notes

   res.json(notes);
}catch(error){
   console.log(error.message);
   res.status(500).send("Internal Server Error");
   }
});
// route -2 addding a new note
router.post('/addnotes',fetchuser,[
   // here only all the checks will be done
   body('title',"Enter a valid title").isLength({min:5}),
   body('description',"description must be atleast  6 characters").isLength({min:6}),
    ],async(req,res)=>{//login requried
try{
// now applying the deconstructor and  getting all the values

const {title,description,tag}=req.body;



        // checking any erros are there if there exit then return errors ,like format checking , empty or not  
const result = validationResult(req);
if (!result.isEmpty()) {
  return res.status(400).json({ errors: result.array() });

// return res.send({ errors: result.array() });
}


// now creating new node
const note=new Note({
       title,description,tag,user:req.user.id,
})
 const savenote=await note.save();

 res.json(savenote);


}catch(error){
   console.log(error.message);
   res.status(500).send("Internal Server Error");
   }
});


// route -3 for updation
router.put('/updation/:id',fetchuser
   // ,[
   // // here only all the checks will be done
   // body('title',"Enter a valid title").isLength({min:5}),
   // body('description',"description must be atleast  6 characters").isLength({min:6}),
   //  ]
   ,async(req,res)=>{//login requried


// first getting the information the user for that performing the decontructor
const {title,description,tag}=req. body;

try {
   
// create newnote object
const newnote={};
if(title){
   newnote.title=title
};
if(description){
   newnote.description=description
};
if(tag){
   newnote.tag=tag
};

// n ow fetch the id from the db
let note= await Note.findById(req.params.id);//getting id  from the url and editing this id->note so for that we are fetching it
if(!note){
   // if we didn't get the note 
  return  res.status(404).send("not found"); 
}
// note.user.toString()---> it wil give the id of the note
if(note.user.toString()!==req.user.id){
   // thougth he is our user but he is not allowed to edit other's  notes
   return res.status(401).send("Not Allowed");
}
// now we can say that  user has right to Acesses this notes

note =await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});


// $set: This is a MongoDB operator used to update specific fields in a document. newnote contains the fields and their new values.
// With { new: true }:When you include { new: true }, Mongoose returns the document after the update, reflecting the latest changes.


res.json(note);
} catch (error) {
   console.log(error.message);
   res.status(500).send("Internal Server Error");
}



})


// route-4 for deletion 
router.delete('/delete/:id',fetchuser
   // ,[
   // // here only all the checks will be done
   // body('title',"Enter a valid title").isLength({min:5}),
   // body('description',"description must be atleast  6 characters").isLength({min:6}),
   //  ]
   ,async(req,res)=>{//login requried


// first getting the information the user for that performing the decontructor
// const {title,description,tag}=req. body;
try {
   
// now fetch the id of the note from the db
let note= await Note.findById(req.params.id);//getting id  from the url and editing this id->note so for that we are fetching it
if(!note){
   // if we didn't get the note 
  return  res.status(404).send("not found"); 
}
// note.user.toString()---> it wil give the id of the note which is a foreign key
if(note.user.toString()!==req.user.id){
   // thougth he is our user but he is not allowed to delete  other's  notes
   return res.status(401).send("Not Allowed");
}
// now we can say that  user has right to Acesses this notes

note =await Note.findByIdAndDelete(req.params.id);


// $set: This is a MongoDB operator used to update specific fields in a document. newnote contains the fields and their new values.
// With { new: true }:When you include { new: true }, Mongoose returns the document after the update, reflecting the latest changes.


res.json({
   "Success":"Note has been deleted ",note:note
});
} catch (error) {
   console.log(error.message);
   res.status(500).send("Internal Server Error");
}



})


module.exports=router;