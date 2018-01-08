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
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


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
 	