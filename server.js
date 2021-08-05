const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const routes = require("./routes/routes");
const stage = require("./config")["development"];
const mongoose = require("mongoose");

const app = express();

app.use(express.static('assets'));
app.use(express.json());

app.use(cors({
	origin: [
		stage.origin,
		stage.devOrigin,
		stage.secDevOrigin,
		stage.buildOrigin
	],
	credentials: true
}));

app.use(fileUpload({
	createParentPath: true
}));

app.use("/api", (req, res, next) => {
	console.log("A Request Just Hit Here Right Now");
	next();
});

app.use("/api", routes);

const options = {
	useNewUrlParser:  true,
	useUnifiedTopology:  true,
	useFindAndModify: false
};

app.listen(`${stage.port}`, async () => {
	await mongoose.connect(stage.mongoURL, options)
	console.log(`App running on PORT: ${stage.port}`);
});
