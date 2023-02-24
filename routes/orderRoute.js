const express = require('express')
const route = express.Router()
const {postOrder,getOrder,deleteItemFromCartItems,deleteFullOrder} = require('../controller/orderController')


route.post('/add',postOrder)
route.delete('/:id',deleteFullOrder)
route.get('/get',getOrder)
route.put('/:orderId/:id' ,deleteItemFromCartItems);



module.exports = route