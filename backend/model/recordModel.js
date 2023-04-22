const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    name : String ,
    address : String ,
    gender : {type : String , enum : ["Male" , "Female" , "Others"]} ,
    phone : {type : String , unique : true},
    email : {type : String , unique : true} ,
    images : [String] ,
    isRemoved : {type : Boolean , default : false} ,
    isDeleted : {type : Boolean , default : false}
} , {timestamps : true})


let Record = mongoose.model('Record' , recordSchema);

module.exports = {Record};