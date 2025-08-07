
const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
   
   const token=req.header('Authorization')?.replace('Bearer ','')
   console.log('token',token);
   

if(!token)return res.status(401).json({
    message:'no  token,access denied'
})


    try{
const decode=jwt.verify(token,'secret')
req.user=decode.user
next()
    }catch(error){
   console.log(error)
    }
}

module.exports={authMiddleware}