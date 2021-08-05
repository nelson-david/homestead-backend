const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
	body: String,
	image: Array,
	date_added: Date,
	likes: Array,
	post_type: String,
	author_id: {
		type: Schema.Types.ObjectID,
		ref: "user"
	},
	author_data: Object
},{
	capped: { size: 1024 },
	bufferCommands: false,
	autoCreate: false
});

module.exports = mongoose.model("Posts", post);