const jwt = require('jsonwebtoken');
const randomid = require('randomid');
const database = require("../database/database");

const genAccessToken = async(user, token) => {
	console.log("Token: ", token)
	return jwt.sign(user, token);
}

module.exports = {
	add_user: async(req, res) => {
		const data = {
			email: req.body.email!==''?req.body.email:undefined,
			username: req.body.username!==''?req.body.username:undefined,
			password: req.body.password!==''?req.body.password:undefined,
			dob: req.body.dob!==''?req.body.dob:undefined,
			age: req.body.age!==''?req.body.age:undefined,
		}
		console.log("Data: ", data);
		try{
			const user = await database.getUser(data.username, true);
			if (user){
				res.send({error:"user already exists"})
				return;
			}
			const userId = await database.createUser(data);
			res.send({userId});
		}catch (error){
			res.sendStatus(500);
			return;
		}
	},
	login_user: async(req, res) => {
		const data = {
			username: req.body.username !== '' ? req.body.username : undefined,
			password: req.body.password !== '' ? req.body.password : undefined,
		}
		try{
			const user = await database.getUser(data.username, true);
			if (user){
				const check = await database.comparePassword(data.password, user.password);
				if (check){
					const token = await genAccessToken({
						_id: user._id, email: user.email, username: user.username
					}, res.config.TOKEN_SECRET);
					res.status(200).send({message: true, 'token': token, 'user': user})
					return;
				}
				res.send({ error: "password" });
				return;
			}
			return res.send({ error: "user" });
		}catch(error){
			res.sendStatus(500);
			return;
		}
	}
}