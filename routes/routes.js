const express = require("express");
const router = express.Router();

const stage = require("../config")["development"];
const jwt = require("jsonwebtoken");

const auth_controller = require("../controllers/auth.controller");
const user_controller = require("../controllers/user.controller");
const post_controller = require("../controllers/post.controller");
const comment_controller = require("../controllers/comment.controller");
const search_controller = require("../controllers/search.controller");

const authToken = (req, res, next) => {
	var token = req.headers['authorization'];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, stage.TOKEN_SECRET, (err, user) => {
   		if (err) return res.sendStatus(403)
  		res.user = user;
    	next();
	})
}

router.get("/home/", (req, res) => {
	return res.json({"message":"Welcome To The App Mate"})
});

// Authentication Route
router.post("/auth/register/", auth_controller.add_user);
router.post("/auth/login/", auth_controller.login_user);

//Search Route
router.get("/search/:data/", search_controller.search);

// User Route
router.get("/current_user/", authToken, user_controller.current_user);
router.get("/user/:username/get/", authToken, user_controller.single_user);
router.post("/user/:username/settings/general", authToken, user_controller.general_settings);

// Post Route
router.post("/post/add/", authToken, post_controller.add_post);
router.get("/post/all/", authToken, post_controller.all_post);

router.get("/post/:id/get/", authToken, post_controller.single_post);
router.post("/post/:id/delete/", authToken, post_controller.delete_post);

router.put("/post/:id/likes/add/", authToken, post_controller.like_post);
router.put("/post/:id/likes/remove/", authToken, post_controller.unlike_post);

// Comment Route
router.get("/post/:id/comment/get/", authToken, comment_controller.get_comment);
router.put("/post/:id/comment/add/", authToken, comment_controller.add_comment);
router.put("/post/:id/comment/:comment_id/like/", 
	authToken, comment_controller.like_comment);

module.exports = router;
