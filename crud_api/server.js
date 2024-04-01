require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const app = express();

const PORT = process.env.PORT || 3010;
const MONGO_URL = process.env.URL;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use("/api/products", productRoute);

app.get("/", (req,res)=>{
    res.send("CRUD API");
})



app.get('/products', async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});

    }
})

app.get('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});

    }
})

app.post('/products', async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json({product})
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

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

mongoose.connect(MONGO_URL).then(()=>{
        app.listen(PORT, ()=>{
            console.log("App running on port 3004");
        })
        console.log("connected to MongoDB");
    }).catch((error)=>{
        console.log(error);
    })