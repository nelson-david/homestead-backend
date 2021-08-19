const User = require("../models/users.model");
const Post = require("../models/posts.model");
const Comment = require("../models/comment.model");
const bcrypt = require("bcryptjs");
const randomid = require("randomid");

module.exports = {
	addComment: async(data, post, user) => {
		const new_comment = new Comment({
			comment_id: randomid(6),
			body: data.text,
			date_added: new Date().toISOString(),
			post_id: post,
			author_data: user
		});
		await new_comment.save();
		return new_comment;
	},
	getComment: async(id) => {
		comment = Comment.findOne({ 'comment_id': id });
		return comment;
	},
	getAllComment: async(post_id) => {
		comments = await Comment.find({ 'post_id': post_id });
		return comments;
	},
	deletePost: async(id) => {
		const deleted_post = await Post.findOneAndDelete({ '_id': id });
		return deleted_post;
	},
	getPost: async(id) => {
		const post = await Post.findOne({'_id':id});
		return post;
	},
	getAllPost: async() => {
		const posts = await Post.find().sort({ date_added: -1 });
		return posts;
	},
	createPost: async(data, photo_data, post_type, user) => {
		const new_post = new Post({
			body: data['body'],
			image: photo_data,
			post_type: post_type,
			date_added: new Date().toISOString(),
			author_id: user,
			author_data: user
		});

		await new_post.save();
		return new_post;
	},
	getUser: async(username, return_password) => {
		const user = await User.findOne({'username': username});
		if (user && return_password === false){
			user.password = undefined
		}
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
	},
	comparePassword: async(request_password, user_password) => {
		const check = await bcrypt.compare(request_password, user_password);
		return check;
	}
}