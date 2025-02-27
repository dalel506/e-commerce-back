const express = require ("express")
const app = express()
require("dotenv").config()
app.use(express.json())
var cors = require('cors')
 
app.use(cors())

//routes configuration 
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"));



//database connection
const connectDB = require("./config/connectDB")
connectDB()


//port connection
const port = process.env.PORT
app.listen(port, ()=>console.log("my server is running on port :",port))