const express = require("express");
const compression = require("compression");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const routes = require("./routes/routes");
const stage = require("./config")["development"];
const mongoose = require("mongoose");

const app = express();

if (stage.environment == "production"){
    console.log("Using Compression");
    app.use(compression({
        level: 9,
        threshold: 0,
        filter: (req, res) => {
            return compression.filter(req, res);
        }
    }));
}

app.use(express.static('assets'));
app.use(express.json());

app.use(cors({
    origin: [stage.origin],
    credentials: true
}));

app.use(fileUpload({
    createParentPath: true
}));

app.use("/api", routes);

module.exports = app;
