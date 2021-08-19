const randomid = require('randomid');
const database = require("../database/database");

const upload_img = (file, path) => {
	const file_id = `${randomid(4)}.${file.name.split('.')
		[file.name.split('.').length - 1]}`;
	file.mv(`./assets/${path}/` + file_id);
	const file_info = { name: file_id, size: file.size }
	return file_info;
}

module.exports = {
	delete_post: async(req, res) => {
		await database.deletePost(req.params.id);
		return res.status(200).send({ message: "post successfully deleted" })
	},
	like_post: async(req, res) => {
		const post = await database.getPost(req.params.id);
		if (post){
			post.likes.push({
				date_liked: new Date().toISOString(),
				like_id: randomid(5),
				liker_data: {
					_id: res.user._id,
					email: res.user.email,
					username: res.user.username,
					profile_picture: res.user.profile_picture,
					date_joined: res.user.date_joined,
				}
			});
			await post.save();
			return res.send({message: "post successfully liked"});
		}else{
			return res.status(400).send({ message: "post not found" })
		}
	},
	single_post: async(req, res) => {
		const post = await database.getPost(req.params.id);
		if (post){
			return res.send({post:post})
		}
		return res.status(400).send({message:"post not found"})
	},
	all_post: async(req, res ) => {
		const all_posts = await database.getAllPost();
		return res.send({posts:all_posts});
	},
	add_post: async (req, res) => {
		const data = req.body;

		let photo_data = [];
		var post_type = 'text_only';

		if (req.files){
			const file_data = req.files['files'];
			post_type = 'text_image';
			if (file_data.length != undefined){
				file_data.map(function(photo){
					const image = upload_img(photo, 'img');
					photo_data.push(image);
				});
			}else{
				const image = upload_img(file_data, 'img');
				photo_data.push(image);
			}
		}
		const user = await database.getUser(res.user.username);
		const new_post = await database.createPost(data, photo_data, post_type, user);
		return res.send({
			message: "success", info: "Post Successfully Added", post:new_post
		});
	}
}