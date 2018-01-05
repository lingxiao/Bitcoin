/**
 * @file deploy_contract.js
 * @author Xiao Ling <lingxiao@seas.upenn.edu>
 * @date 1/3/2018
*/

// import modules
var fs   = require("fs");
var pr   = require("./prelude")
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
var contract_path = "Voting.sol"
const input       = fs.readFileSync(contract_path)
const output      = solc.compile(input.toString(), 1);

// get contract key name
var contract_name = ":" + contract_path.split(".")[0]



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
*/
web3.personal.unlockAccount(user0, "xenomorph1", 15000000);

var deployed_contract = Contract.new(["Rama", "Nick", "Jose"],  // candidate for election
						   { data : "0x" + bytecode    			// contract in bytecode
	                       , from : user0              			// ID the person who deployed the contract for the blockchain
	                       , gas  : 400000             			// price to pay to deploy the code onto the blockchain
	                   	   })						   			// user0's ether account will be used to buy 400000 units of gas, price of gas is  set by the network

/** 
	get the address of the contract
	when we interact with the contract, we need the adress and ABI
*/
// problem: this address is undefined, but we can still find it for some reason?
// is this why the contract is not firing? since the address isn't defined for some reason?
var contract = Contract.at(deployed_contract.address);

// declare event callback => right now even tis not firing
var event = contract.Log_to_console();
event.watch(function(err, results){

	if (err){

		console.log("error ", err);

	} else {

		console.log("fired: ", results);
	}

});

	
/**
	- consider the possiblity it's the private blockchain that's not working?
	- maybe it's the address that's not working correctly?
	- some sort of async issue?

	- strategy: run a very small and simple contract that you understand
	  and make sure everything runs

*/
if (true) {

	/**
		note we're using contract's abi. why are we XXX.call it?
	*/
	console.log("Rama's votes: ", contract.totalVotesFor("Rama"))
	console.log("Nick's votes: ", contract.totalVotesFor("Nick"))
	console.log("Jose's votes: ", contract.totalVotesFor("Jose"))

	// contract.voteForCandidate("Rama", {from: user0})
	web3.personal.unlockAccount(user1, "xenomorph2", 15000000);

	// problem right now, it's not voting even though we have done so
	// what we need right now is a way to print event to console so we can look at it
	// note everytime we do this, we get: submitted contract creation on the private blockchain
	contract.voteForCandidate.call("Rama", {from: user0})

	console.log("Rama's votes after voting: ", contract.totalVotesFor.call("Rama"))
	console.log("done!")

}























































