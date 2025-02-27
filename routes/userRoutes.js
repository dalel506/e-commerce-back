const express = require('express')
const router = express.Router()
const {register, login, getUserdata, getProduct, createOrder, getUserOrders, addProduct, getProductById} = require('../controllers/userController')
const {userMiddleware} = require("../middleware/userMiddleware")


router.post("/register", register)
router.post("/login", login)
router.get("/getuserdata",userMiddleware, getUserdata)
router.get("/getproducts", getProduct)
router.post("/createorder", userMiddleware,createOrder)
router.get("/getuserorders",userMiddleware,getUserOrders)
router.post("/addproduct", addProduct)
router.get("/getproducts/:id", getProductById);







module.exports = router