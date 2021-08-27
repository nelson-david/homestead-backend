const randomid = require('randomid');
const database = require("../database/database");

module.exports = {
	follow_user: async(req, res) => {
		var current_user = await database.getUser(res.user.username, false);
		var follow_user = await database.getUser(req.params.username, false);

		current_user.followed.push(follow_user);
		await current_user.save();

		return res.json({message:"success"})
	},
	general_settings: async(req, res) => {
		const user = await database.getUser(res.user.username, true);
		if (user){
			const data = req.body;

			if (req.files) {
				const cover_photo = req.files['cover_photo'];
				const coverphoto_id = `${randomid(4)}.${cover_photo.name.split('.')
				[cover_photo.name.split('.').length - 1]}`;
				cover_photo.mv('./assets/img/cover_photo/' + coverphoto_id);
				user.cover_photo = coverphoto_id;

				const profile_photo = req.files['profile_photo'];
				const profilephoto_id = `${randomid(4)}.${profile_photo.name.split('.')
				[profile_photo.name.split('.').length - 1]}`;
				profile_photo.mv('./assets/img/profile_photo/' + profilephoto_id);
				user.profile_picture = profilephoto_id;
			}

			user.username = data.username;
			user.email = data.email;
			user.gender = data.gender;
			user.bio = data.bio;

			await user.save();
			return res.json({ message: true })
		}
		return res.status(400).send({message:"user not found"})
	},
	current_user: async(req, res) => {
		try{
			const user = await database.getUser(res.user.username);
			if (user){
				user.password = undefined;
				return res.json({ 'user': user });
			}
		}catch(error){
			res.sendStatus(500);
			return;
		}
	},
	single_user: async(req, res) => {
		try{
			const user = await database.getUser(req.params.username);
			if (user){
				user.password = undefined;
				return res.status(200).send({user:user});
			}
			return res.status(400).send({message:"user not found"});
		}catch(error){
			res.sendStatus(500);
			return;
		}
	}
}