const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const app = express();
require('dotenv').config();
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")



app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)

mongoose.connect(process.env.MONGO_ID
	,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
}).then(()=>{
	console.log("db connected successfully")
}).catch((err)=>{
	console.log(err);
});

let PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
	res.send(`<h1>Hello</h1>`)
})

const server = app.listen(PORT,()=>{
	console.log(`Server Started on ${PORT} `);
});

const io= socket(server,{
	cors:{
		origin:"https://chat-siris-v1.vercel.app",
		credentials:true,
	},
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
	global.chatSocket = socket
	socket.on('add-user',(userId)=>{
		onlineUsers.set(userId,socket.id);
	})
	socket.on('add-msg',(data)=>{
		const sendUserSocket = onlineUsers.get(data.to); //gets the user if he is online
		if(sendUserSocket){
			socket.to(sendUserSocket).emit('msg-recieve',data.message);
		};
	})
})





