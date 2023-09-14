const express = require("express")
const app = express()
const PORT = 5000;
const userRouter = require("./routes/users")
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    //res.send("Server up")
    //res.status(200).send("Hi")
    //res.status(200).json({"name":"abhith"})
    //res.download("server.js")
    //res.render("index")
    res.render("index",{text:"Abhi"})
})

//gets router form the routes folder and set the default or starting opath ie ""
app.use("/users",userRouter)

app.listen(PORT,()=>{
    console.log(`Sever running on port ${PORT}`)
})