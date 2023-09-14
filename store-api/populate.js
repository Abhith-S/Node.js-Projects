//populate the db with values

const mongoose  = require("mongoose");
const connectDB = require("./db/connect");
require("dotenv").config();
const Products = require("./models/product");
const jsonProducts = require("./products.json");

const start = async ()=>{
    try{

        await connectDB(process.env.MONGO_URI);
        await Products.deleteMany();
        await Products.create(jsonProducts);
        console.log("Success");
        process.exit(0);

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start();