const mongoose = require('mongoose')


const userSchema =  new mongoose.Schema({
	username:{
		type: String,
		min:3,
		max:20,
		unique:true,
	},
	email:{
		type: String,
		required: true,
		unique:true,
		max:50,
	},
	isAvatarImageSet: {
		type:Boolean,
		default:false,
	},
	avatarImage:{
		type:String,
		default:"",
	},
	recentChats:Array,
	backgroundImage:String,
})


module.exports = mongoose.model("Users",userSchema)