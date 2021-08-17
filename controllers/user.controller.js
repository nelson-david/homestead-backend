const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const stage = require("../config")["development"];
const randomid = require('randomid');

const check_username = (username, current_user) => {
	User.findOne({'username':username}, async(err, user) => {
		if (!err && user){
			console.log("user: ", user);
		}else{
			return "Failed"
		}
	})
}

module.exports = {
	general_settings: (req, res) => {
		User.findOne({'username':req.params.username}, async(err, user) => {
			if (!err && user){
				const data = req.body;

				if (req.files){
					const cover_photo = req.files['cover_photo'];
					const coverphoto_id = `${randomid(4)}.${cover_photo.name.split('.') 
						[cover_photo.name.split('.').length-1]}`;
					cover_photo.mv('./assets/img/cover_photo/' + coverphoto_id);
					user.cover_photo = coverphoto_id;

					const profile_photo = req.files['profile_photo'];
					const profilephoto_id = `${randomid(4)}.${profile_photo.name.split('.') 
						[profile_photo.name.split('.').length-1]}`;
					profile_photo.mv('./assets/img/profile_photo/' + profilephoto_id);
					user.profile_picture = profilephoto_id;
				}

				user.username = data.username;
				user.email = data.email;
				user.gender = data.gender;
				user.bio = data.bio;

				await user.save();
				return res.json({message:true})
			}else{
				return res.json({message:false});
			}
		})
	},
	current_user: (req, res) => {
		User.findOne({'_id':res.user._id}, async(err, user) => {
			if (!err && user){
				user.password = undefined;
				return res.json({'user':user});
			}else{
				return res.json({message:false});
			}
		});
	},
	single_user: (req, res) => {
		User.findOne({'username':req.params.username}, async(err, user) => {
			if (!err && user){
				user.password = undefined
				return res.json({message:true, user:user});
			}else{
				return res.json({message:false});
			}
		});	
	}
}