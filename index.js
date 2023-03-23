const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const cors = require("cors");
const dbConnect = require('./mongo/dbConnect');
const Document = require("./mongo/Document");
require("dotenv").config();

app.use(cors());

const defaultValue = "";

io.on('connection',(socket)=>{
   
    //room
    socket.on('get-document',async documentId =>{
        const document =await findOrCreateDocument(documentId);
        socket.join(documentId);
  
        socket.emit('load-document',document.data);

        socket.on('send-changes',(delta)=>{
            socket.broadcast.to(documentId).emit('recive-changes',delta);
        });

        socket.on("save-document",async data =>{
            await Document.findByIdAndUpdate(documentId, {data});
        })
    });
});

async function findOrCreateDocument(id){
 if(id == null) return;

 const document = await Document.findById(id);
 if(document) return document;

 return await Document.create({
    _id: id,
    data: defaultValue
 })
}

app.get('/',(req,res)=>{
    res.send("hello world")
})

dbConnect();
const PORT = process.env.PORT || 4000;
server.listen(PORT,()=>{
console.log("server start",PORT);
});