const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const stage = require("../config")["development"];
const randomid = require('randomid');

const genAccessToken = (email) => {
	return jwt.sign(email, stage.TOKEN_SECRET);
}

module.exports = {
	add_user: (req, res) => {
		const data = req.body;
		User.findOne({'email': data.email}, async (err, user) => {
			if (err) throw err;
			if (user) res.json({message:"exists"});
			if (!user){
				const new_user = new User({
					username: data.username,
					age: data.age,
					email: data.email,
					profile_picture: "default.webp",
					date_joined: new Date().toISOString(),
					password: await bcrypt.hash(req.body.password, 8),
					dob: data.dob
				});
				await new_user.save((err, user) => {
					if (!err){
						new_user.save();
						return res.json({
							message: true,
							info:"Successfully Saved"
						});
					}
				});
			}
		});
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
							location: user.location
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