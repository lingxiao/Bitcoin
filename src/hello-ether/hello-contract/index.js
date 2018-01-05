/**
	@file: index.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/2/2018
	@Use: setting up a private blockchain, mine for coins, and readBalance from javscript module after plugging 
		  into the ethereum network
*/

// import modules
var Web3 = require("web3");
var web3 = new Web3();

/*
	connecting to running ethereum node. Note the node must specify --rpcport 8545
*/
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("Ethereum-NodeJS App started")
console.log("Web3.js - API version: " + web3.version.api + " Node: " + web3.version.node.ethereum + "\n")

// store hah of transaction sent
var tranSent;

// get account address and print their account value
// note we created two accounts earlier in the private blockchain
var user_0 = web3.eth.accounts[0];
var user_1 = web3.eth.accounts[1];

console.log("================= printing balance ====================")

console.log("account zero's balance is: " + web3.eth.getBalance(user_0)["c"][0])
console.log("account one's balance is: " + web3.eth.getBalance(user_1)["c"][0])

 	