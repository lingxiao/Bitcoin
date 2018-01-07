/**
	@file login_contract.js
	@author Xiao Ling <lingxiao@seas.upenn.edu>
	@date 1/3/2018
*/

// import modules
var Web3 = require("web3");
var web3 = new Web3();

/*
	connecting to running ethereum node. Note the node must specify --rpcport 8545
*/
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/**
	get EVM bytecode and interface descripton file, used by web3 to interact with contract
	once it's uploaded to the network
*/ 
const loginAbi      = require("../solidity/contracts/Login.json").abi;
const loginContract = web3.eth.contract(loginAbi);

module.exports = loginContract;










