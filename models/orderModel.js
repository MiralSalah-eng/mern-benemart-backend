const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

const orderSchema = new Schema({
    email : {
        type: String,
        required: true,

    },
    name :{
        type: String,
        required: true,

    },
    address :{
        type: String,
        required: true,

    },
    phone :{
        type: Number,
        required: true,

    },
    cartItem : [] ,

    totalAmount : Number,
    totalQuantity : Number
    
})

module.exports = mongoose.model('benemartOrders',orderSchema)