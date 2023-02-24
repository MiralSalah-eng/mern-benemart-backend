const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required:true
    },
    image :{
        type: String,
    },
    isAdmin : {
        type : Boolean,
    }

})


//Signup method
userSchema.statics.signup = async function (username,email,password,image) {
   
    if ( !email || ! password ) {
        throw Error ("All fields must be filled") 
   }

    if (!validator.isEmail(email)) { 

        throw Error ('Email not valid')
    }
    if (!validator.isStrongPassword(password)) { 

        throw Error ('Password must be strong')
    }

    const exists = await this.findOne({email})

    if (exists) {
         throw Error ('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({ username  :username ,email : email, password: hash , image : image ,  isAdmin : false
    })

    return user

}



//Login method

userSchema.statics.login = async function (email,password) {
    
    if ( !email || ! password ) {
        throw Error ("All fields must be filled") 
   }


    const user = await this.findOne({email})

    if (!user) {
         throw Error ('Incorrect Email')
    }

    const match = await bcrypt.compare(password,user.password)

    if( !match ) {
        throw Error ('Incorrect Password')
    }
    
    return user

}
//Edit Personal Info

userSchema.statics.editPersonalInfo = async function (name, email,password,id) {
    
  
    if (!validator.isEmail(email)) { 

        throw Error ('Email not valid')
    }

    if(!password.startsWith('$2a$' || '$2y$' ||' $2b$')){
        if (!validator.isStrongPassword(password)) { 

            throw Error ('Password must be strong')
        } else {
            password = await bcrypt.hash(password,10)
        }
       }

    const user = await this.findByIdAndUpdate({_id:id},{username:name , email,  password },{new: true})

    return user

}

module.exports = mongoose.model('user',userSchema)
