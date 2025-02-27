const User = require("../models/userSchema")
const Product = require("../models/productSchema")
const Order = require("../models/orderSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const register = async(req,res)=>{
    try{
const {name,email,password} = req.body
const newuser = await User.findOne({email})
if (newuser) res.status(400).json({message:"user already exist, try to login!"})
else {
    const hashedPW = await bcrypt.hash(password, 10)
    const createUser = await User.create({name,email,password:hashedPW})
    const token = jwt.sign({id:createUser._id}, process.env.JWT_SECRET , {expiresIn: "7d"})
    res.status(201).json({message:"user created successfully",token: token, user:createUser})
}  
}
    catch(error){
        res.status(500).json({message:"something went wrong /register", error : error.message})

    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const userExist = await User.findOne({email})
        if(!userExist) res.status(400).json({message:"user does not existtry to register!"})
            else {
        const checkPassword = await bcrypt.compare(password,userExist.password)
        if(!checkPassword) res.status(404).json({message:"password is incorrect!"})
            const token = jwt.sign({id:userExist._id}, process.env.JWT_SECRET , {expiresIn: "7d"})
        res.status(200).json({message:"login successful",token:token,user:userExist})
            }
    }
    catch{
     res.status (500).json({message:"something went wrong /login", error : error.message})
    }
}

const getUserdata = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.userId})
        if(!user)
            res.status(400).json({message:"user does not exist try to register!"})
        else{  
        res. status(200).json({message:"user info success!",user:user})
            }
    }
    catch(error){
        res.status(500).json({message:"something went wrong /getUserData", error : error.messag})


    }
}

const getProduct = async(req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json({message:"product info success!",products})
    }
    catch(error){
        res.status(500).json({message:"something went wrong /getProduct", error : error.messag})
    }
}


const createOrder = async(req,res)=>{
    try{
        const {userId,productList} = req.body
        const newOrder = await Order.create({product:productList, owner:userId})
        res.status(201).json({message:"send Orders!", newOrder})
    }
    catch{
        res.status(500).json({message:"something went wrong /createOrder", error : error.messag})
    }
}
const getUserOrders = async(req,res)=>{
try{
    const {userId} = req.body
    const userOrder = await Order.find({owner:userId})
    res.status(200).json({message:"Get all orders", userOrder})

}
catch(error){
    res.status(500).json({message:"something went wrong /getUserOrders", error : error.messag})
}
}

const addProduct = async(req,res)=>{
    try{
        const {name,price,description,poster} = req.body
        const newProduct = await Product.create(req.body)
        res.status(201).json({message:"product created!",product:newProduct})
    
    }
    catch(error){
        res.status(500).json({message:"something went wrong /addProduct", error : error.messag})
    }
}





const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId); 
        if (!product) {
          return res.status(404).send('Product not found');
        }
        res.json(product);
      } catch (error) {
        res.status(500).send('Server error');
      }
      };

















module.exports = {register, login,getUserdata,getProduct, createOrder, getUserOrders,addProduct, getProductById};