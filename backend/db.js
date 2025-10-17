// const mongoose=require('mongoose');
// const mongoURI='mongodb://localhost:27017/mynotes';

// const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes'

// now connecting the db old version
// const  connectTOMongo=()=>{
  
// mongoose.connect(mongoURI,()=>{
//     // it is a  call back function that will be called or executed after db connected sucessfully
//     console.log("connected to Mingo sucessfully");

// })

// const connectToMongo = async () => {//here call back function is not allowed instead of that we are going with promise
//     try {
//       await mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log("Connected to MongoDB successfully");
//     } catch (error) {
//       console.error("Failed to connect to MongoDB", error);
//     }
//   };

// // }

// // now export this module so that i can use it any where
// module.exports=connectToMongo;


const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Subject = require("./models/Subject"); // Import Subject model


dotenv.config();

const mongoURI = 'mongodb://localhost:27017/mynotes'; // Specify your database name
// const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes'
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Still recommended
      useUnifiedTopology: true 

    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongo;

