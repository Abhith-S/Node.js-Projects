require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");
//to acccess cookies in the express when the browser sends it back
const  cookieParser = require("cookie-parser");

//express
const express = require("express");
const app = express();

//database
const connectDB = require("./db/connect")

//routers
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes");

//error
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan('tiny'))
app.use(express.json());
//passing jwt secret to sign it
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/",(req,res)=>{
  console.log(req.cookies);
    res.status(200).send("E-Commerce API")
})

app.get("/api/v1",(req,res)=>{
  console.log(req.signedCookies);
    res.status(200).send("Sending jwt as cookies")
})


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);

//error middleware should be the last ie after notFoundMiddleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server started on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
