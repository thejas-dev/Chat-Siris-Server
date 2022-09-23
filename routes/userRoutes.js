const {login,register,setAvatar,getAllUsers,deleteBackground,searchAllUsers,setRecentChat,deleteAvatar,changeName,changeBackground} = require('../controllers/userControllers')

const router = require('express').Router();


router.post('/delete/:id',deleteAvatar);
router.post('/setchat/:id',setRecentChat);
router.post('/changebackground/:id',changeBackground);
router.post('/deletebackground/:id',deleteBackground)
router.post('/login',login);
router.post('/register',register)
router.post('/changeName/:id',changeName);
router.post('/setavatar/:id',setAvatar)
router.get("/allUsers/:id/:recentChats",getAllUsers);
router.get("/searchUsers/:id/:username",searchAllUsers);

module.exports = router;