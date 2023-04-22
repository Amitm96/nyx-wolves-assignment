const mongoose = require('mongoose');


async function conncetDB(){
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI , {useNewUrlParser : true});
        console.log("Mongodb connected"); 
    }
    catch(err){
        console.log(err.message);
        process.exit();
    }
}

module.exports = conncetDB;