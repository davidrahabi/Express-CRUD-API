const Product = require("../models/productModel");

const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});

    }
}

const getOneProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});

    }
}

const createProduct = async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json({product})
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await Product.findByIdAndUpdate(id,req.body);
        if(!products){
            return res.status(404).json({message: `Product id ${id} not found`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteProduct = async(req,res)=>{

    try{
    const {id} = req.params;
    const products = await Product.findByIdAndDelete(id);
    if(!products){
        return res.status(404).json({message:`Product id ${id} not found`});
    }
    res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};