/**
	@file: app.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/11/2018
*/

import * as express   from 'express';
import * as http      from 'http';
import * as WebSocket from 'ws';


// declare instance of web application
const app = express();

// home page
app.get('/', (req, res) => 
		res.send(`hello world from app.ts with rand num: ${Math.floor(Math.random()*100)}`)
	);

/**
	what we want:
		- a thing that listens to the websocket and logs to console
		- a thing that listens to websocket and prints to html
*/ 
// app.get('socket')

// start the app
app.listen(3000, () => console.log("web app listening on port 3000"));


