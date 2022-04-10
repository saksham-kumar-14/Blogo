const mongoose = require("mongoose");
const user_model = require("./user");

const blog_schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }

})

const blog_model = mongoose.model("blogs" , blog_schema);
module.exports = blog_model