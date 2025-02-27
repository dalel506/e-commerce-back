const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: String, required: true},
    poster:{type: String, required: true},
    category:{type: String,required:true},
    details:{type: String,required:true},

})

const Product = mongoose.model('product', productSchema)
module.exports = Product