const Post = require("../models/posts.model");
const User = require("../models/users.model");
const randomid = require("randomid");

module.exports = {
	search: async(req, res) => {
		var post_data;
		var user_data;

		Post.find({$or: [{body: {$regex:req.params.data}}]}, function(err, posts){
			if (!err){
				post_data = posts;
				User.find({$or: [{username: {$regex:req.params.data}}]}, function(err, users){
					if (!err){
						user_data = users;
						res.json({post_data, user_data});
					}else{
						return res.json({"message":false});	
					}
				})
			}else{
				return res.json({"message":false});	
			}
		})
	},
}