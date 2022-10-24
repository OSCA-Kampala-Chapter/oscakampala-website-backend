const User = require('../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')

// USER LOGIN FUNCTION
const login = async ({email,password},callback) => {
    const user = await User.findOne({email});
    if(user != null){
    const comparepwd = bcrypt.compareSync(password, user.password);
      if(comparepwd){
        const token = await auth.generateAccessToken(email);
        return callback(null,{...user.toJSON(),token});
      }else{
        return callback({
            message:"Invalid Username or Password"
        })
    }
    }else{
         return callback({
            message:"Invalid Username or Password"
        })
    }
}

// USER REGISTER FUNCTION
const register = async(params,callback) => {
   const {password} = params;
   const salt =  await bcrypt.genSalt(10);
    params.password = await bcrypt.hashSync(password,salt);
    if(params.username == undefined) return callback({message:"Username is required"});

    const user = new User(params);
    user.save()
    .then((response)=>{
       return callback(null,response)
    })
     .catch((error)=>{
  return callback(error)
    })
}

// EXPORT FUNCTIONS
module.exports = {
    login,
    register
}