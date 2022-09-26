
const User = require("../models/userModel");


module.exports.login = async(req,res,next)=>{
	try{
		const{email} = req.body;
		const user = await User.findOne({email})
		if(!user){
			return res.json({msg:"Account need to be Regitered",status:false});			
		}
		return res.json({status:true, user})
	}catch(ex){
		next(ex)
	}
}

module.exports.register = async(req,res,next)=>{
	try{
		const {username,email} = req.body;
		const user = User.create({
			email,username
		})
		console.log(user)
		return res.json({status:true,user})
	}catch(ex){
		next(ex);
	}
}
module.exports.setAvatar = async(req,res,next)=>{
	try{
		const userId = req.params.id;
		const avatarImage = req.body.image;
		const userData = User.findByIdAndUpdate(userId,{
			isAvatarImageSet:true,
			avatarImage,
		},(err,obj)=>{

		})
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
	}catch(ex){
		next(ex);
	}
}

module.exports.getAllUsers = async(req,res,next)=>{
	try{
		const data = User.find( { _id:{$eq:req.params.recentChats} } ,(err,data)=>{
			return res.json(data)
		}).select([
			"email",
			"username",
			"avatarImage",
			"_id",
		]);
	}catch(ex){
		next(ex);
	}
}


module.exports.searchAllUsers  =async(req,res,next)=>{
	try{
		let username = req.params.username
	
		const {data} = User.find( { username:{$eq:username},_id:{$ne:req.params.id} },(err,data)=>{return res.json(data)} ).select([
			"email",
			"username",
			"avatarImage",
			"_id",			
		]);
		

	}catch(ex){
		next(ex);
	}
}


module.exports.setRecentChat = async(req,res,next)=>{
	try{
		const userId = req.params.id
		const {chatId} = req.body;
		const userData = User.findByIdAndUpdate(userId,{
			recentChats:chatId
		},{new:true},(err,docs)=>{
			console.log(docs)
			return res.json(docs)

		})
 		console.log(userData)
	}catch(ex){
		next(ex)
	}
}


module.exports.deleteAvatar = async(req,res,next)=>{
	try{
		const userId = req.params.id;
		const avatarImage = ""
		const userData = await User.findByIdAndUpdate(userId,{
			isAvatarImageSet:false,
			avatarImage,
		})
		return res.json(userData)
	}catch(ex){
		next(ex);
	}
}

module.exports.changeName = async(req,res,next)=>{
	try{
		const userId = req.params.id
		const {username}=req.body
		const userData = User.findByIdAndUpdate(userId,{
			username,
		},(err,obj)=>{
			return res.json(obj)
		})
	}catch(ex){
		next(ex)
	}
}

module.exports.changeBackground = async(req,res,next)=>{
	try{
		const userId = req.params.id;
		const {backgroundImage} = req.body;
		const userData = User.findByIdAndUpdate(userId,{
			backgroundImage,
		},(err,obj)=>{
			return res.json(obj)
		})

	}catch(ex){
		next(ex);
	}
}


module.exports.deleteBackground = async(req,res,next)=>{
	try{
		const userId = req.params.id;
		const backgroundImage = null
		const userData = User.findByIdAndUpdate(userId,{
			backgroundImage,
		},(err,obj)=>{
			return res.json(obj);
		})
	}catch(ex){
		next(ex)
	}
}