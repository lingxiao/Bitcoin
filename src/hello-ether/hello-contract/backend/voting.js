/**
 * @file simpleStorage.js
 * @author Xiao Ling <lingxiao@seas.upenn.edu>
 * @date 1/3/2018
*/

// import modules
var fs   = require("fs");
var pr   = require("../prelude")
var solc = require("solc");
var Web3 = require("web3");
var web3 = new Web3();

/**
	connecting to running ethereum node at prespecified port

*/
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/**
	get accounts 
*/
var user0 = web3.eth.accounts[0];		// is coinbase
var user1 = web3.eth.accounts[1];

// hard code path to contract, and read contract
var contract_path = "../solidity/contracts/Voting.sol"
const input       = fs.readFileSync(contract_path)
const output      = solc.compile(input.toString(), 1);

// get contract key name
var contract_name = ":" + pr.last(contract_path.split("/")).split(".")[0]


/**
	This is the bytecode you get when the source code in [Contract].sol 
	is compiled. This is the code which will be deployed to the blockchain
*/
const bytecode = output.contracts[contract_name].bytecode


/**
	This is an interface or template of the contract (called abi) which tells 
	the contract user what methods are available in the contract. 
	Whenever you have to interact with the contract in the future, you will need this abi definition.
*/
const abi_     = JSON.parse(output.contracts[contract_name].interface)


// create contract class using ABI, instances of this Contract will have the interface specified by the abi
const Contract = web3.eth.contract(abi_);


/**
	now create an instance of the contract. XXXX.new deploys the contract on
	the block chain

	first unlock account for 1500000 seconds

	reference: http://www.ethdocs.org/en/latest/contracts-and-transactions/contracts.html
	for more administrative steps in saving contract hash, etc.
*/
web3.personal.unlockAccount(user0, "xenomorph1", 15000000);

var deployed_contract = Contract.new(["Santorum", "Obama", "Clinton"]   // candidates for election 
                                   , {data : "0x" + bytecode    		// contract in bytecode
		  	                       , from : user0              			// ID the person who deployed the contract for the blockchain
	      		                   , gas  : 400000             			// price to pay to deploy the code onto the blockchain user0's ether account will be used to buy 400000 units of gas, price of gas is  set by the network
	              		     	   })


 /** 
 	note, should wait till address is confirmed by the blockchian before running this
	get the address of the contract
	when we interact with the contract, we need the adress and ABI
	Note: if the blockchain is mining, then then address filed should not be undefined

	TODO: this should move to a call back of some sort just to make sure
		  this is fired after the contract has been mined by the chain
*/
var contract = Contract.at(deployed_contract.address);


/**
	call XXX.sendTransaction(input, {from: user_x}, callback) will send transaction as contract
	to the network, and spend gas from user_x, with executed `callback`
*/ 
contract.voteForCandidate.sendTransaction("Obama"  , {from: user0});
contract.voteForCandidate.sendTransaction("Obama"  , {from: user0});
contract.voteForCandidate.sendTransaction("Clinton", {from: user0});


// these should be executed after the block has been mined, the votes should have been
// incremented
console.log("Obama's votes: ", contract.totalVotesFor("Obama"))
console.log("Clinton's votes: ", contract.totalVotesFor("Clinton"))


























