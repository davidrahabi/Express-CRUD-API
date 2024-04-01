const express = require("express");
const Product = require('../models/productModel');
const {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct} = require("../controller/productController");

const router = express.Router();


//@desc Get all products
//@route GET /products
//@access public
router.get('/', getProducts)

//@desc Get one product by id
//@route GET /products/:id
//@access public
router.get('/:id', getOneProduct)

//@desc Create a product
//@route POST /products
//@access public
router.post('/', createProduct)

//@desc Update a product by id
//@route PUT /products/:id
//@access public
router.put("/:id", updateProduct)


//@desc Delete a product by id
//@route DELETE /products/:id
//@access public
router.delete("/:id", deleteProduct)

module.exports = router;