const express = require('express');
const conncetDB = require('./config/connectDb');
const socketIo = require("socket.io");
const env = require('dotenv');
const http = require("http");
let {addRecord , allRecords , deleteRecord , getRecord , updateRecord} = require("./controller/recordController")

const app = express();

env.config();

const server = http.createServer(app);
// This creates our socket using the instance of the server
const io = require('socket.io')(server, {cors: {origin: "*"}});

app.use(express.json());

conncetDB();

io.on("connection" , socket => {

    socket.on("allrecords" , () => {allRecords().then((records) => io.sockets.emit("records" , records.data))
    .catch((err) => io.sockets.emit("fetchingfail" , err.msg))})

    socket.on("addRecord" , record => {
        
        let response = addRecord(JSON.parse(record) )
        response.then((data) => io.sockets.emit("recordAdded" , data.msg))
        .catch((err) => io.sockets.emit("addrecordfailed" , err.msg));
    })

    socket.on("delete" , id => {
        let res = deleteRecord(id);
        res.then((data) => io.sockets.emit("success" , data.msg ))
        .catch((err) => io.sockets.emit("deletefail" , err.msg))
    })

    socket.on("getrecord:id"  , id => {
        let res = getRecord(id);
        res.then((data) => io.sockets.emit("recordfetched" , data.data))
    })

    socket.on("update" , data => {
        let res = updateRecord(data.id , data.updateData);

        res.then((data) => io.sockets.emit("updatesuccess" , data.msg))
        .catch((err) => io.sockets.emit("updatefailed" , err.msg))
    })

})


let port = process.env.PORT || 5000;

server.listen(port , () => console.log(`server listen at ${port}`));

