/**
    @file: charity.ts
    @author: Xiao Ling <lingxiao@seas.upenn.edu>
    @date: 1/26/2018
*/

import * as Web3     from 'web3'     ; 
import * as fs       from 'fs'       ;
import * as solc     from 'solc'     ;
import { ContractFactory } from 'ethereum-contracts';
var pr    = require("../lib/prelude");
var utils = require('./contractUtils') ;

var web3 : Web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// load contract
var contract_path : string = "../solidity/contracts/Charity.sol"
var contract_bytecode : [Contract, String] = utils.compile_contract(contract_path, web3);
var Contract : Contract = contract_bytecode[0];
var bytecode : String   = contract_bytecode[1];

/********************************************************************
	var coinbase = "0x449021b2219186745762b49cac0158107ad3e5ce";
	const input : Buffer  = fs.readFileSync(contract_path)
	const output : Object = solc.compile(input.toString(), 1);
	var contract_name : string = ":" + pr.last(contract_path.split("/")).split(".")[0]
	const bytecode : string = output.contracts[contract_name].bytecode
	const abi_ : Array = JSON.parse(output.contracts[contract_name].interface);
	var deployed = Contract.deploy({ data: '0x' + bytecode });
	var callback = deployed.send({ from: coinbase, gas: 400000 })
*/

/**
	@Use: get account and do something with it
*/
web3.eth.getAccounts().then(accounts => { 

	utils.display_account(accounts, web3    );

	// console.log("--------------------------------------\n")
	
	// utils.deploy_contract(accounts, Contract, bytecode);
	// var coinbase = accounts[0]
    // web3.eth.personal.unlockAccount(coinbase, 'password-1');

	/*
		problem: send of null
	*/
	// Contract.deploy({ data: '0x' + bytecode }).send({

	// 	  from: coinbase
	// 	, gas : 400000

	// },  (err, transactionHash) => {

	// 	if (err){
	// 		console.log("error: ", err)
	// 	} else {
	// 		console.log("success: ", transactionHash)
	// 	}
	// })

	// utils.display_account(accounts, web3);
	// console.log("--------------------------------------\n")
});


// /**
// 	@Use: deploy contract
// */
// function deploy_contract(accounts){

// 	var coinbase = accounts[0]

// 	var deployed_contract = Contract.new({data : "0x" + bytecode      
// 	                                    , from : coinbase
// 	                                    , gas  : 400000});

// 	var contract = Contract.at(deployed_contract.address);
	
// 	/**
// 	    call XXX.sendTransaction(input, {from: user_x}, callback) will send transaction as contract
// 	    to the network, and spend gas from user_x, with executed `callback`
// 	    note r is undefined even though contract returns a value, because sendTransaction does not return value
// 	*/ 
// 	contract.change.sendTransaction(3000, {from: coinbase}, (err, val) => {

// 	    if (err){
// 	        console.log("transaction error: ", err)
// 	    } else {
// 	        // the val returned is the transaction hash
// 	        console.log("transaction successeded: ", val)
// 	    }

// 	});
// }


// /**
// 	@Use: given path to contract, make contract
// */
// function compile_contract(contract_path : String) : [Contract, String] {

// 	const input       = fs.readFileSync(contract_path)
// 	const output      = solc.compile(input.toString(), 1);

// 	// get contract key name
// 	var contract_name = ":" + pr.last(contract_path.split("/")).split(".")[0]

// 	*
// 	    This is the bytecode you get when the source code in [Contract].sol 
// 	    is compiled. This is the code which will be deployed to the blockchain
	
// 	const bytecode = output.contracts[contract_name].bytecode


// 	/**
// 	    This is an interface or template of the contract (called abi) which tells 
// 	    the contract user what methods are available in the contract. 
// 	    Whenever you have to interact with the contract in the future, you will need this abi definition.
// 	*/
// 	const abi_     = JSON.parse(output.contracts[contract_name].interface)

// 	// create contract class using ABI, instances of this Contract will have the interface specified by the abi
// 	const Contract = new web3.eth.Contract(abi_);


// 	return [Contract, bytecode]
// }


// /**
// 	@Use: print accounts
// */
// function display_account(accounts : Array){

//     var user_0 = accounts[0];
//     var user_1 = accounts[1];

//     web3.eth.subscribe('newBlockHeaders', (err, ret) => {

//         if (err) { 
            
//             console.log("error: ", err)

//         } else {

//             /**
//                 todo: get rid of this nested callback
//             */ 
//             web3.eth.getBalance(user_0).then(bal_0 => {

//                 web3.eth.getBalance(user_1).then(bal_1 => {

//                     var msg1 = 'Balance for user coinbase is ' + bal_0
//                     var msg2 = 'Balance for receiver is '      + bal_1
//                     var msg  = msg1 + '\n\n' + msg2

//                 })

//             })

//         }

//     })
// }

