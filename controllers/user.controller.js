const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const stage = require("../config")["development"];
const randomid = require('randomid');

module.exports = {
	current_user: (req, res) => {
		User.findOne({'_id':res.user._id}, async(err, user) => {
			if (!err && user){
				return res.json({'user':user});
			}else{
				return res.json({message:false});
			}
		});
	}
}