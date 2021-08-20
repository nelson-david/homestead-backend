const database = require("./database/database");
const config = require("./config")["production"];
const makeApp = require("./app");
const app = makeApp(database, config);
const mongoose = require("mongoose");


app.listen(`${config.port}`, async () => {
	await mongoose.connect(config.dbURL, config.options)
	console.log(`App running on PORT: ${config.port}`);
});