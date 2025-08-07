const express=require('express')
const connectDB = require('./config/db')

const userRoutes= require("./routes/userRoutes")
const PORT =process.env.PORT
const cors=require('cors')

const app = express()


// CORS configuration
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())

app.use("/api/users",userRoutes)


connectDB()
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

// //

