const database = require("../database/database");
const jwt = require('jsonwebtoken');
const stage = require("../config")["development"];
const randomid = require('randomid');

const genAccessToken = (username) => {
	return jwt.sign(username, stage.TOKEN_SECRET);
}

module.exports = {
	add_user: async(req, res) => {
		const data = req.body;

		try{
			const user = await database.getUser(data.username);
			if (user){
				res.status(400).send({error:"user already exists"})
				return;
			}
			const userId = await database.createUser(data)
			res.send({userId})
		}catch (error){
			res.sendStatus(500);
			return;
		}
	},
	login_user: (req, res) => {
		data = req.body;
		User.findOne({'username':data.username}, async(err, user) => {
			if (!err && user){
				await bcrypt.compare(req.body.password, user.password, 
					(err, check) => {
					if (!err && check){
						const auth_user = {
							username: user.username,
							age: user.age,
							followed: user.followed,
							followers: user.followers,
							_id: user._id,
							email: user.email,
							profile_picture: user.profile_picture,
							date_joined: user.date_joined,
							dob: user.dob,
							location: user.location,
							verified: user.verified
						}
						const token = genAccessToken(auth_user);
						return res.json({
							message:true, 'token':token, 'user':auth_user
						});
					}else{
						return res.json({message:"password_error"})
					}
				});
			}else{
				return res.json({message:false});
			}
		});
	}
}