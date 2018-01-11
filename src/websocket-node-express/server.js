"use strict";
/**
    @file: server.ts
    @author: Xiao Ling <lingxiao@seas.upenn.edu>
    @date: 1/11/2018
    @Tutorial source: https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
*/
exports.__esModule = true;
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var app = express();
var server = http.createServer();
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    // connection is up, add simple event:
    ws.on('message', function (message) {
        console.log("received: {message}");
        ws.send("hello, you sent -> " + message);
    });
    // send feedback to incoming connection
    ws.send('Hi there, I am a websocket server');
});
server.listen(8999, function () {
    console.log("Server started on port " + server.address().port);
});
