const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const tasks = require("./routes/tasksRoute");
const { connectDb } = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

//middleware
app.use(express.json());

app.get("/hello",(req,res)=>{
    res.send("Hello from server");
})


//create a route and controller for getAllTasks
app.use("/api/v1/tasks",tasks)

//middleware for 404
app.use(notFound);
app.use(errorHandler);

const start = async()=>{

    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(port,()=>{
        console.log(`Server started on port ${port}`)
        })
       

    }catch(err){
        console.log(err)
    }
}

start();

