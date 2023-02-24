require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productsRoute')
const orderRoute = require('./routes/orderRoute')

var cors = require('cors')
var app = express()
 
app.use(
  cors({
    origin : [ "http://localhost:3000" , "https://mern-benemart.onrender.com" ]
  })
  )


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('images'));

const PORT =  process.env.PORT || 4000

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port',PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

app.use('/api/user', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/products', productRoute)