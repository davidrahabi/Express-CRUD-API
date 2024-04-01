const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
app.get("/", (req,res)=>{
    res.send("CRUD API");
})

//@desc Get all products
//@route GET /products
//@access public
app.get('/products', async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});

    }
})

//@desc Get one product by id
//@route GET /product/:id
//@access public
app.get('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});

    }
})

//@desc Create a product
//@route POST /products
//@access public
app.post('/products', async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json({product})
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//@desc Update a product by id
//@route PUT /product/:id
//@access public
app.put("/product/:id", async(req,res)=>{
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
})


//@desc Delete a product by id
//@route DELETE /product/:id
//@access public
app.delete("/product/:id", async(req,res)=>{

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
})

mongoose.connect(
    'mongodb+srv://davidrahabi:jDaogR3E56nqb4vo@cluster0.hvcuhhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ).then(()=>{
        app.listen(3004, ()=>{
            console.log("App running on port 3004");
        })
        console.log("connected to MongoDB");
    }).catch((error)=>{
        console.log(error);
    })
