const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
	comment_id: String,
	body: String,
	image: Array,
	date_added: Date,
	likes: Array,
	post_id: {
		type: Schema.Types.ObjectID,
		ref: "post"
	},
	author_data: Object
},{
	capped: { size: 1024 },
	bufferCommands: false,
	autoCreate: false
});

module.exports = mongoose.model("Comments", comment);