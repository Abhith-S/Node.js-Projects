const Products = require("../models/product");

const getAllProducts = async(req,res)=>{
    
    res.status(200).send("All products");
}

const getAllProductsStatic = async(req,res)=>{

    const products  = await Products.find({company:"marcos"})

    res.status(200).send({products,numOfhits: products.length});
}

module.exports = {getAllProducts,getAllProductsStatic}