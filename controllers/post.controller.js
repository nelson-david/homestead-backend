const Post = require("../models/posts.model");
const User = require("../models/users.model");
const randomid = require("randomid");

module.exports = {
	like_post: (req, res) => {
		console.log(req.params.id);
		Post.findOne({'_id':req.params.id}, async(err, post) => {
			if (!err && post){
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
				return res.json({"message":"success"});
			}else{
				return res.json({message:false});
			}
		});
	},
	unlike_post: (req, res) => {
		Post.findOne({'_id':req.params.id}, async(err, post) => {
			if (!err && post){
				console.log(post.likes);
				return res.json({"message":"success"});
			}else{
				return res.json({message:false});
			}
		});
	},
	single_post: (req, res) => {
		Post.findOne({'_id':req.params.id}, async(err, post) => {
			if (!err && post){
				return res.json({'post':post});
			}else{
				return res.json({message:false});
			}
		});
	},
	all_post: async(req, res ) => {
		const all_posts = await Post.find().sort({date_added:-1});;
		return res.json({posts:all_posts});
	},
	add_post: async (req, res) => {
		const data = req.body;

		let photo_data = [];
		var post_type = 'text_only';

		if (req.files){
			const fileKeys = req.files['files'];
			post_type = 'text_image';
			fileKeys.map(function(photo){
				photo.mv('./assets/img/' + photo.name);
				photo_data.push({
					name: photo.name,
					size: photo.size
				});
			});
		}
		const new_post = new Post({
			body: data['body'],
			image: photo_data,
			post_type: post_type,
			date_added: new Date().toISOString(),
			author_id: res.user,
			author_data: {
				_id: res.user._id,
				email: res.user.email,
				followed: res.user.followed,
				followers: res.user.followers,
				username: res.user.username,
				profile_picture: res.user.profile_picture,
				dob: res.user.dob,
				date_joined: res.user.date_joined,
			}
		});
		await new_post.save();
		return res.json({"message": "success"});
	}
}