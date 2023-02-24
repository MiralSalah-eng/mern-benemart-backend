const express = require('express')
const router = express.Router()
const { signupUser, loginUser,editPersonalInfo , getAllUsers ,deleteUser } = require('../controller/authController')
const multer = require('multer')


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

router.post('/signup', upload.single('image') ,signupUser);
router.post('/login',loginUser)
router.put('/:id',editPersonalInfo)

router.get('/' ,getAllUsers);
router.delete('/:id' ,deleteUser);

module.exports = router