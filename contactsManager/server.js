const express = require("express");
const dotenv = require("dotenv").config()

const app = express()

const port = process.env.PORT || 5000;

//to get the env file data
//console.log(process.env.PORT)

//all the routes are going to have /api/contacts as beginning
//we specify where the routes exist in file
app.use("/api/contacts",require("./routes/contactRoutes"))

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})