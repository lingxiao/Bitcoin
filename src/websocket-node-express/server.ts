/**
	@file: server.ts
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/11/2018
	@Tutorial source: https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
*/


import * as express   from 'express';
import * as http      from 'http';
import * as WebSocket from 'ws';

const app    = express();
const server = http.createServer();
const ws_server = new WebSocket.Server({ server });


/**
	@Instructions: 
		1. on console run:  ts-node server.ts
		2. Navigate to chrome-extension://pfdhoblngboilpfeibdedpjgfnlcodoo/index.html and set URL to 

	- so we have a websocket server that broadcasts on channel 8999
	- now do one that outputs 


*/
ws_server.on('connection', (ws: WebSocket) => {

	// connection is up, add simple event:
	ws.on('message', (message: string) => {

			console.log('received: ' + message);
			ws.send(`hello, you sent -> ${message}`);

	});

	// send feedback to incoming connection
	ws.send('Hi there, I am a websocket server from server.ts');

});


server.listen(8999, () => {
	console.log(`Server started on port ${server.address().port}`);
});