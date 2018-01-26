/**
 * @file simpleStorage.js
 * @author Xiao Ling <lingxiao@seas.upenn.edu>
 * @date 1/3/2018
*/

// import modules
var fs   = require("fs");
var solc = require("solc");
var Web3 = require("web3");
var pr   = require("../lib/prelude");


var web3 = new Web3();

/**
    connecting to running ethereum node at prespecified port
*/
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/**
    get accounts 
*/
var user0 = web3.eth.accounts[0];       // is coinbase
var user1 = web3.eth.accounts[1];

// hard code path to contract, and read contract
var contract_path = "../solidity/contracts/SimpleStorage.sol"
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

// ["Rama", "Nick", "Jose"],  // candidate for election

var deployed_contract = Contract.new({data : "0x" + bytecode                // contract in bytecode
                                   , from : user0                       // ID the person who deployed the contract for the blockchain
                                   , gas  : 400000                      // price to pay to deploy the code onto the blockchain user0's ether account will be used to buy 400000 units of gas, price of gas is  set by the network
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
    call XXX.call runs the contract code locally, nothing will be submitted to the chain
*/ 
var val = contract.change.call(424)
console.log("changed value: ", val)

/**
    call XXX.sendTransaction(input, {from: user_x}, callback) will send transaction as contract
    to the network, and spend gas from user_x, with executed `callback`
    note r is undefined even though contract returns a value, because sendTransaction does not return value
*/ 
var r = contract.change.sendTransaction(930, {from: user0}, function(err, val){

    if (err){
        console.log("transaction error: ", err)
    } else {
        // the val returned is the transaction hash
        console.log("transaction successeded: ", val)
    }

});


contract.set.sendTransaction(500, {from: user0}, function(err, val){

    if (err){ console.log("transaction error: ", err)      }
    else    {  console.log("transaction succeeded: ", val) }

});

/**
    now we attach listener to the event so we can get the return value
*/ 
var evt = contract.ReturnValue({_from: user0});

/**
    the callbacks in this function will fire when
    the block is mined and the transaction goes through 
*/
evt.watch(function(err,ret){

    if (err) { 
        console.log("error state: \n", err)
    } else {
        console.log("success state: \n", ret.args.value)
    }

});

// note we get a return value here, but it is the transaction hash, not 
// the actualy return value from the contract
var t = contract.change.sendTransaction(Math.round(Math.random() * 100), {from: user0})
    





