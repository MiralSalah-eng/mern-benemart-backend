const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = Schema ({
    productName : {
        type : String,
        required : ['true','Please Enter Product Title']
    },
    imgUrl : {
        type : String,
        required : ['true','Please Upload Product Image']
    },
    category : {
        type : String,
        required : ['true','Please Enter Product Category']
    },
    price : {
        type : Number,
        required : ['true','Please Enter Product Price']
    },
    shortDesc : {
        type : String,
        required : ['true','Please Write Product Short Description']
    },
    description : {
        type : String,
    },
})

productSchema.statics.addProduct = async function (title,category,shortDesc,desc,price,image) {

    if ( !title || ! category || !shortDesc || !price || !image) {
        throw Error ("All fields must be filled") 
   }

   const exists = await this.findOne({productName :title})

    if (exists) {
         throw Error ('This Product is Already Added Before')
    }

    const product = await this.create({
        productName: title,category,shortDesc,desc,price,imgUrl :image
    })

    return product
}

productSchema.statics.allProducts = async function () {
   const products = await this.find({})
    return products
}

productSchema.statics.deleteProduct = async function (id) {
  
   const product = await this.findByIdAndDelete({_id:id})
    return product
}



module.exports = mongoose.model('benemartProduct',productSchema)