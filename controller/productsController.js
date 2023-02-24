const Product = require('../models/productModel')

const addProducts = async (req,res) => {

    const {title,category,shortDesc,desc,price} = req.body
    const image = req.file.filename

    try {
        const product = await Product.addProduct(title,category,shortDesc,desc,price,image)
        res.status(201).json({product : product})

    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
}

const getProducts = async (req,res) => {

    try {
        const products = await Product.allProducts()
        res.status(201).json(products)

    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
}


const deleteProduct = async (req,res) => {

    const {id} = req.params
    try {
        const product = await Product.deleteProduct(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
}
module.exports = { addProducts ,getProducts,deleteProduct}