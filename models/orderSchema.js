const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
   Create:{type: Date, default: new Date()},
    products:Array,
    owner:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
})

const Order = mongoose.model('order', orderSchema)
module.exports = Order