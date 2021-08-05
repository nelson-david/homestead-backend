const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
	username: String,
	password: String,
	profile_picture: String,
	email: String,
	gender: String,
	date_joined: Date,
	dob: Date,
	age: Number,
	number: String,
	followed: Array,
	followers: Array,
	location: String,
	blocked: Array
},{
	capped: { size: 1024 },
	bufferCommands: false,
	autoCreate: false
});

module.exports = mongoose.model("Users", user);