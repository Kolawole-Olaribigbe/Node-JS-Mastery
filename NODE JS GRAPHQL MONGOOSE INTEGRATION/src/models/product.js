const mongoose = require('mongoose');
const { type } = require('os');

const ProductSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    category : {
        type : String,
        required : true
    },
    // id : {
    //     type : NaN,
    //     required : true
    // },
    price : {
        type : Number,
        required : true
    },
    inStock : {
        type : Boolean,
        required : true
    }
});
module.exports = mongoose.model("Product", ProductSchema)