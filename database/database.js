const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

module.exports = {
	getUser: async(username) => {
		const user = await User.findOne({'username': username});
		return user;	
	},
	createUser: async(data) => {
		const new_user = new User({
			username: data.username,
			age: 25,
			email: data.email,
			profile_picture: "default.webp",
			cover_photo: "cover_default.webp",
			date_joined: new Date().toISOString(),
			password: await bcrypt.hash(data.password, 8),
			dob: data.dob,
			verified: false,
		});
		await new_user.save();
		return new_user._id;
	}
}