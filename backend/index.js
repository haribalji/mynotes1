const connectTOMongo=require("./db");
const express = require('express')
const axios=require('axios');
const quizzes= require("./models/Quiz");
connectTOMongo();//now this function which is created in db file can used here as it was imported

const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())

app.use(express.json());//to acess the body og the request

// now  setup the  sever by creating the route to listen to the port

// const allowedOrigins = [
//   "http://localhost:5000", 
//   "http://localhost:3000", 

//   "https://mynotebook-2xx9.onrender.com"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Allow cookies if needed
//   })
// );




app.use("/api/auth",require("./routers/auth"))

app.use("/api/notes",require("./routers/notes"))
app.use("/api/students",require("./routers/students"))

app.use("/api/subjects",require("./routers/subjects"))
app.use("/api/chapters",require("./routers/chapters"))
app.use("/api/studentnotes",require("./routers/studentnotes"));
app.use("/api/studentmedias", require("./routers/studentmedias"));
app.use("/api/topics",require("./routers/topics"))
app.use("/api/user",require("./routers/user"))
app.use("/api/checklists",require("./routers/checklists"))
app.use("/api/summarizes", require("./routers/summarizes"));
app.use("/api/adminauth", require("./routers/adminauth"));

app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// app.get('/api/login', (req, res) => {
//   res.send('Hello World!')
// })



// router.get("/getuser", getuser, (req, res) => {
//   res.json({ userId: req.user.id });
// });
app.get('/api/signup', (req, res) => {
    res.send('Hello World!')
  })


  // Route to get quiz data from MongoDB
app.get("/api/quizzes", async (req, res) => {
  try {
    console.log("hii")
    const quizData = await quizzes.find();
    console.log(quizData);
    res.json(quizData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to insert quiz data into MongoDB
app.post("/api/quizzes", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

