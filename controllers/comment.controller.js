const Post = require("../models/posts.model");
const User = require("../models/users.model");
const Comment = require("../models/comment.model.js");
const randomid = require("randomid");

module.exports = {
	like_comment: (req, res) => {
		Comment.findOne({'comment_id':req.params.comment_id}, async(err, comment) => {
			if (!err && comment){
				comment.likes.push({
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

				await comment.save();
				return res.json({"message":"success"});
			}else{
				return res.json({message:false});
			}
		});
	},
	get_comment: (req, res) => {
		Comment.find({'post_id':req.params.id}, async(err, comments) => {
			if (!err && comments){
				return res.json({"message":"success", "comments":comments});
			}else{
				return res.json({message:false});
			}
		});
	},
	add_comment: (req, res) => {
		Post.findOne({'_id':req.params.id}, async(err, post) => {
			if (!err && post){
				const new_comment = new Comment({
					comment_id: randomid(6),
					body: req.body.text,
					date_added: new Date().toISOString(),
					post_id: post,
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
				await new_comment.save();
				Comment.find({'post_id':req.params.id}, async(err, comments) => {
					if (!err && comments){
						return res.json({"message":"success", "comments":comments});
					}else{
						return res.json({message:false});
					}
				});
			}else{
				return res.json({message:false});
			}
		});
	}
}