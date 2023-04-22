let {Record} = require("../model/recordModel");

async function addRecord(data){
    try{
        let newRecord = await Record.create(data);
        return {status : true , msg : "Record created successfully" }
    }
    catch(err){
        // console.log(err.message);
        return {status : false , msg : err.message};
    }
}

async function allRecords(){
    try{
        let records = await Record.find({isDeleted : false , isRemoved : false});
        return {data : records}
    }
    catch(err){
        return {msg : err.message}
    }
}

async function deleteRecord(id){
    try{
        await Record.findByIdAndUpdate(id , {$set : {isDeleted : true}});
        return {msg : "deleted successfull"};
    }
    catch(err){
        return {msg : err.message};
    }
}

async function getRecord(id){
    try{
        let record = await Record.findById(id);
        return {data : record};
    }
    catch(err){
        return {msg : err.message};
    }
}

async function updateRecord(id , updateData){
    try{
        let updated = await Record.findByIdAndUpdate(id , updateData);
        return {msg : "Updation Success"};
    }
    catch(err){
        return {msg : err.message};
    }
}

module.exports = {addRecord , allRecords , deleteRecord , getRecord , updateRecord};