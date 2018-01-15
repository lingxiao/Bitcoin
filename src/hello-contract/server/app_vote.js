/**
	@file: app_vote.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/7/2018
	@Note: web application that interacts with ethereum
*/


/**
    set up server using express

    problem: right now there is a package setup problem... may behoove
    me to slow down and do it right once again?

    problem: right now the stuff is very confusing, maybe set up a new 
    minimal application? but then you get all this shit ... 
    what if I installed it here.. get it working here. and then transfer over?
    
    strategy:
        1. serve simple html    -> done
        2. serve more complex html and do some event listeners 
            -> need a plug in the html
            -> need to serve the html, and attach listeners to each plug
            -> need to know the canonical way to factorize the code into differnt files

        3. connect Voting.js to this somehow, make sure the ether-blockchain is updating
            -> at this point we can do a simple simpleStorage.js
                -> build one where we just display the current user's account, and it should go up as coins are mined
                -> 

            -> we just have to know how various part of the thing interacts
                -> there are two processes going on here, the node.js process
                    and the pipe into the ethereum blockchain process

*/
const pr         = require("../lib/prelude");
const fs         = require("fs");
const solc       = require("solc");
const bodyParser = require("body-parser");
const express    = require("express");
const Web3       = require("web3");
const path       = require("path");

var template_dir = "/Users/lingxiao/Documents/Projects/Bitcoin/src/hello-ether/hello-contract/frontend"

// launch web app and web3
var web3 = new Web3();
var app  = express();
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static("voting"))

// URL map to resource
app.get("/", (req, res) => res.send("hello world from vote application"));


// right now you need to connect to the ethereum blockchain

/**
    fire up blockchain
*/ 
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

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


console.log(output)




// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));




