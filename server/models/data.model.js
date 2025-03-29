const mongoose =require("mongoose");
const path = require("path");

const dataSchema=new mongoose.Schema({
FirstName:{
    type:String,
    required:true
},
LastName:{
    type:String,
    required:true
},
coverImage:{
    type:String,
    default: path.join(__dirname, '../public/uploads/User.png')
},
createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports =mongoose.model("Data",dataSchema)