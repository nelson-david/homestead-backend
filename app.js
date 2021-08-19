'use strict';

const express = require("express");
const compression = require("compression");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const stage = require("./config")["production"];
const mongoose = require("mongoose");

const makeApp = (database) => {
    const app = express();

    if (stage.environment == "production") {
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

    const appRoute = require("./routes/routes");
    const route = appRoute(database);

    app.use("/api", route);
    
    return app;
}

module.exports =  makeApp;