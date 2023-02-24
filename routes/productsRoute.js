const express = require('express')
const router = express.Router()
const multer = require('multer')
const {addProducts , getProducts,deleteProduct} = require('../controller/productsController')


const upload = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,'../ecommerce/src/assets/images')
        },
        filename : (req,file,cb) => {
            cb(null, Date.now()+ '-' + file.originalname)
        }
    })
})

router.post('/add',upload.single('image'),addProducts)
router.get('/all-producs',getProducts)
router.delete('/:id',deleteProduct)

module.exports = router