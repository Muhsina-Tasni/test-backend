 const User=require ('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



const getAllUsers=async (req,res)=>{
    try{
   const users= await User.find()
   res.json({users})
 
    }catch(error){
console.log(error)
    }
 } 




 const register=async(req,res)=>{
    console.log('.......')
    const {name,email,password}=req.body
    try{
const find=await User.findOne({email})
if(find)return res.json({
    message:"user already registered"
})
        
const hashedpassword = await bcrypt.hash(password,10)


  const registered= await User.create({name,email,password:hashedpassword})
   res.json(registered)
    }catch(error){
console.log(error)
    }
 }



const login=async (req,res)=>{

    const {email,password}=req.body

    try{
   const user= await User.findOne({email})
   if(!user) return res.status(400).json({
    message:"invalid credential"
   })
   

   const isMatch = await bcrypt.compare(password,user.password)
   if(!isMatch) return res.status(400).json({
    message:"invalid credentials"
   })


   const payload={user:{id:user.id}}
   const token=jwt.sign(payload,'secret',{expiresIn:'1h'})

   res.json({message:"successfully registered",token})

//    res.json({
//     message:"user registered successfully"
//    })

    }catch(error){
console.log(error)
    }
 }





const getProfile=async (req,res)=>{

    try{
    // const user = req.user
    const user=await User.findById(req.user.id)
 res.json({
    message:'success',
    data:user
 }) 
.json({message:req.user})

    }catch(error){
console.log(error)
    }
 }

module.exports={getAllUsers,register,login,getProfile}



