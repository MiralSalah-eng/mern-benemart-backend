const Order = require('../models/orderModel')

const postOrder = async (req,res) => {
     const {name,email,address,phone,cartItem,totalAmount,totalQuantity} = req.body

     try {
        const order = await Order.create({name,email,address,phone,cartItem,totalAmount,totalQuantity})
        res.status(201).json(order)

    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
}

const getOrder = async (req,res) =>{
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)

    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
}

const deleteItemFromCartItems = async (req,res) => {
    const {orderId,id} =  req.params;
  
    try {
     await Order.findById({_id : orderId}).then(async(order) =>{
         const item = order.cartItem.filter(item => item.id===id)
         const price = Number(item[0].totalPrice);
         const qty = Number(item[0].quantity)
         await Order.findByIdAndUpdate({_id : orderId},{$pull: {cartItem : {id : id}} ,
            $inc: {totalAmount: -price , totalQuantity: -qty}}).then(async(item) => {
                if(item.totalQuantity === 1) {
                    await Order.findByIdAndDelete({_id : orderId})
                }
                console.log(item)
                const orders = await Order.find({})
                res.status(200).json(orders)
            }) 
        })
    
    } catch (error) {
        res.status(400).json({ error : error.message })

    }
}
const deleteFullOrder = async (req,res) => {
    const {id} =  req.params;
  
    try {
     await Order.findByIdAndDelete({_id : id})
      const orders = await Order.find({})
        res.status(200).json(orders)   
    

    } catch (error) {
        res.status(400).json({ error : error.message })

    }
}



module.exports = { postOrder , getOrder , deleteItemFromCartItems , deleteFullOrder}

