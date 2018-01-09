/**
	@file: index.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/2/2018

	@Note: this runs with web3 0.20.1, do: npm install web3@0.20.1
*/

// import modules
var pr   = require("../lib/prelude");
var Web3 = require("web3");     

// connect to etherum blockchain
// http port
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// websocket port
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));


/**
	Notes on web3 design decisions:

	Ethereum as a blockchain has different levels of finality and therefore needs to 
	return multiple “stages” of an action. To cope with requirement we return a “promiEvent” 
	for functions like web3.eth.sendTransaction or contract methods. 
	This “promiEvent” is a promise combined with an event emitter to allow acting on 
	different stages of action on the blockchain, like a transaction.

	PromiEvents work like a normal promises with added on, once and off functions. 
	This way developers can watch for additional events like on “receipt” or “transactionHash”.
*/ 

/**
	note here we store the promise in the acctPromise so we always have it. 
	this is akin to:

	web3.eth.getAccounts() >>= \accts => log accts >> return accts >= \accts => do more stuff.
*/ 
let acctPromise = web3.eth.getAccounts().then(function(accts){
	console.log("printing account: ", accts)
	return accts
});


/**
	now we are going to assert that the accts 
	value has been passed
*/
acctPromise.then(function(accts){

	console.log("assert accts still there: ", accts);
	return accts

}).catch(err => {

	console.log("error: ", err)

});

/**
	Now we use output of previous computation 
	to get the value of the next one, note the nested 
	callback. and then return the value
*/ 
let user_0_balance = acctPromise.then(function(accts){

	var balance = web3.eth.getBalance(accts[0]).then(function(bal){

		console.log("balance: ", bal)
		return {"user": accts[0], "balance": bal}

	});

	return balance;
});


/**
	now wwe read this balance, and note its type and value:
*/ 
user_0_balance.then(function(tup){

	console.log("callback: ", tup);

	console.log("type of output: ", pr.typeOf(tup["balance"]));      // :: string
	console.log("do arithmetic: ", tup["balance"] / 2) // can do arithmateic
	return tup;

});


/**
	note how the value can be passed around arbitraritly                                  
*/
user_0_balance.then(function(tup){

	console.log("next callback on user 0 balance: ", tup)

});

/**
	Now let's do a live listener that runs forever and 
	reflects the updates in the blockchain
	
	note we need to open a websocket connection in geth, not http:

	geth --identity "node" --nodiscover --maxpeers 0 --datadir /Users/lingxiao/Documents/Projects/Bitcoin/src/ether-2/data --networkid 123 --ws --wsport 8546 --wsorigins "*" console

*/ 
var foo = web3.eth.subscribe("newBlockHeaders", function(err, result){
	if (err){ console.log(err) }
	else { console.log("result: ", result) }
});




/*
	connecting to running ethereum node. Note the node must specify --rpcport 8545
	note: after moving the files around it's now no longer connecting
	stategy: go through the whole thing from the top again:
		-> new ethereum blockchain
		-> new accounts
		-> new port
	conclusion: still not working ... 

	it seems like things are async now... maybe it's because you upgraded things?
	you're running a different version of web3 than what's in the blog


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// web3.setProvider(ether_port);

console.log("Ethereum-NodeJS App started ...");
console.log("Web3.js - API version: " + web3.version.api + " Node: " + web3.version.node.ethereum + "\n")

// get account address and print their account value
// note we created two accounts earlier in the private blockchain
var user_0 = web3.eth.accounts[0];
var user_1 = web3.eth.accounts[1];

console.log("================= printing balance ====================")

console.log("account zero's balance is: " + web3.eth.getBalance(user_0)["c"][0])
console.log("account one's balance is: " + web3.eth.getBalance(user_1)["c"][0])

*/
 	