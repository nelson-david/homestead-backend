const database = require("./database/database");
const makeApp = require("./app");
const app = makeApp(database);
const mongoose = require("mongoose");
const stage = require("./config")["production"];


app.listen(`${stage.port}`, async () => {
	await mongoose.connect(stage.dbURL, stage.options)
	console.log(`App running on PORT: ${stage.port}`);
});