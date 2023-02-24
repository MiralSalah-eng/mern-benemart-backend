const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const signupUser = async (req,res) => {
    const { username,email,password } = req.body

    if (!req.file) {
        try {
            
            const user = await User.signup(username,email,password)
            const token = createToken(user._id)
            res.status(201).json({user , token})
    
        } catch (error) {
            res.status(400).json({ error : error.message})
        } 
      }
      else {
    const image = req.file.filename
    
    try {
        const user = await User.signup(username,email,password,image)
        const token = createToken(user._id)
        res.status(201).json({user , token})

    } catch (error) {
        res.status(400).json({ error : error.message})
    } 
      }
}


// login
const loginUser = async (req,res) => {
    const { email,password } = req.body 

    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)

        res.status(200).json({user , token})
        
    } catch (error) {
        res.status(400).json({ error : error.message })

    }
}

const editPersonalInfo = async (req,res) => {
    let {name, email,password } = req.body 
    const {id} = req.params

    try {
        const user = await User.editPersonalInfo(name, email,password,id)
        res.status(200).json({user})
        
    } catch (error) {
        res.status(400).json({ error : error.message })

    }
}


//Admin Control
const getAllUsers = async (req,res) => {

    try {
        const users = await User.find({})
        res.status(200).json(users)
        
    } catch (error) {
        res.status(400).json({ error : error.message })

    }
}
const deleteUser = async (req,res) => {
    const {id} =  req.params
    try {
        await User.findOneAndDelete({_id : id})
        await User.find({}).then((users) => {
            res.status(200).json(users)
        })
        
    } catch (error) {
        res.status(400).json({ error : error.message })

    }
}

module.exports = { signupUser, loginUser , editPersonalInfo, getAllUsers , deleteUser}
