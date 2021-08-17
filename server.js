const app = require("./app");
const mongoose = require("mongoose");
const stage = require("./config")["development"];

app.listen(`${stage.port}`, async () => {
	await mongoose.connect(stage.dbURL, stage.options)
	console.log(`App running on PORT: ${stage.port}`);
});