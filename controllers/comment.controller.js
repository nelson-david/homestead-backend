const jwt = require('jsonwebtoken');
const randomid = require('randomid');
const database = require("../database/database");

module.exports = {
	like_comment: async(req, res) => {
		const comment = await database.getComment(req.params.comment_id);
		if (comment){
			const user = await database.getUser(res.user.username);
			comment.likes.push({
				date_liked: new Date().toISOString(),
				like_id: randomid(5),
				liker_data: user
			});
			await comment.save();
			return res.status(200).send({message:"comment liked"})
		}
		return res.status(500).send({message:"invalid comment_id"});
	},
	get_comment: async(req, res) => {
		const comments = await database.getAllComment(req.params.id);
		return res.status(200).send({comments:comments})
	},
	add_comment: async(req, res) => {
		try{
			const post = await database.getPost(req.params.id);
			if (post){
				const user = await database.getUser(res.user.username);
				await database.addComment(req.body, post, user);
				const comments = await database.getAllComment(req.params.id);
				return res.status(200).send({ comments: comments })
			}
			return res.status(400).send({message:"Post Not Found"})			
		}catch(error){
			console.log("The Error Is: ", error);
			res.status(500).send({message: "An Error Occured"})
		}
	}
}