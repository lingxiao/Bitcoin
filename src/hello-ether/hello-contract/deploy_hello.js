/**
 * @file deploy_hello.js
 * @author Xiao Ling <lingxiao@seas.upenn.edu>
 * @date 1/3/2018
*/

// import modules
var fs   = require("fs");
var pr   = require("./prelude")
var solc = require("solc");
var Web3 = require("web3");
var web3 = new Web3();

// hard code path to contract
var contract_path = "SimpleStorage.sol"

// read contracts
var contract_src = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) selfdestruct(owner); } } contract greeter is mortal { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet() constant returns (string) { return greeting; } }'

const input    = fs.readFileSync(contract_path)
const output   = solc.compile(input.toString(), 1);

const output   = solc.compile(output, 1);
const bytecode = output.contracts[":SimpleStorage"].bytecode
const abi_     = JSON.parse(output.contracts[":SimpleStorage"].interface)

// create contract using ABI
const contract = web3.eth.contract(abi_);

/**
	connecting to running ethereum node. Note the node must specify --rpcport 8545
*/
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

// get account address and print their account value
// note we created two accounts earlier in the private blockchain
var user0 = web3.eth.accounts[0];		// is coinbase
var user1 = web3.eth.accounts[1];

/** 
	now we need to deploy the contract on the network
*/
var contractInstance = contract.new({

	  data: "0x" + bytecode
	, from: web3.eth.coinbase    // same as user0, the coinbase address where the mining reward goes to
	, gas: 9000*2

	}, (err, res) => {

		if (err){
			console.log(err);
			return;
		}

		console.log(res.transactionHash);

		if (res.address){
			console.log("contract address: " + res.address);
			// testContract(res.address);
		}
})









