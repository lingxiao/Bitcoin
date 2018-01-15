/**
	@file: app.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/11/2018
*/

import * as express   from 'express';
import * as http      from 'http'   ;
import * as WebSocket from 'ws'     ;
import * as net       from 'net'    ;
import * as http      from 'http'   ;


/**
	strategy:
		- figure out what is going on in here: http://codular.com/node-web-sockets
			- it seems to have the basic quality of what's needed
			- what we will learn: backend and front end listening ...
		- figure out this: http://khaledsaikat.com/chat-application-with-websockets-and-node-js/
			- it looks to be more involved
*/
// var server = http.createServer(function(req, res){})
// server.listen(1234, () => {
// 	console.log(`Server is listening on port 1234 with rand number ${Math.floor(Math.random()*100)}`);
// });

// now use this server as websocket server
// const ws_server = new WebSocket.server({ httpServer: server });

/**
	1. accept connection (from where?)
	2. store connected clients
	3.listen for incoming messages and broadcast to all clients
	4. listen for client disconnecting and remove from clients

	so this is a lower level construction of what we have before
*/ 
// ws_server.on('request', (res) => {
	// var connection = res.accept('echo-protocol', res.origin);
	// console.log("connection", connection);
// });


/**
	goal today: talk to a process somewhere else
*/ 


// declare instance of web application
// const app = express();

// home page
// app.get('/', (req, res) => 
		// res.send(`hello world from app.ts with rand num: ${Math.floor(Math.random()*100)}`)
	// );


/**
	what we want:
		- a thing that listens to the websocket and logs to console
		- a thing that listens to websocket and prints to html
*/ 
// var tcpServer = net.createServer(function(client){

	// console.log("connected to client: ", client)

// });


// tcpServer.listen(8999);

// start the app
// app.listen(3000, () => console.log("web app listening on port 3000"));





