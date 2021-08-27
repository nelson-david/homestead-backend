const jwt = require('jsonwebtoken');
const randomid = require('randomid');
const database = require("../database/database");

const genAccessToken = async(user, token) => {
	console.log("Token: ", token)
	return jwt.sign(user, token);
}

module.exports = {
	add_user: async(req, res) => {
		const data = req.body;
		console.log("Data:", data);
		
		try{
			const user = await database.getUser(data.username, true);
			if (user){
				res.status(400).send({error:"user already exists"})
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
		const data = req.body;
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
				res.status(401).send({ error: "invalid password" });
				return;
			}
			return res.status(400).send({ error: "user does not exist" });
		}catch(error){
			console.log("The Error Is: ", error)
			res.sendStatus(500);
			return;
		}
	}
}