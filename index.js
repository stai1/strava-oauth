'use strict';
require('dotenv').config();

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT;

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.DOMAIN);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    
    next();
});

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

