/**
	@file: app_pingEther.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/7/2018
	@Note: web application that interacts with ethereum, pings blockchain and returns data
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
app.get("/", (req, res) => res.send("hello world from ping ether application"));


// right now you need to connect to the ethereum blockchain

/**
    fire up blockchain
    some thigns to think about: how does the timing work? it seems like theres'
    plenty of opportunity for locks

    we need to set up a minimal application where these problems are exposed:
        -> maybe look for existing tool? looks like a database problem, there
           should be certain primitives??

        -> as a simple prototype, just get the information and display it on the front?
*/ 
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/**
    get accounts 
*/
var user0 = web3.eth.accounts[0];       // is coinbase
var user1 = web3.eth.accounts[1];

/**
    display information in the front, so this shows that we can 
    display info to the front

    hypothesis: this does update on each refresh -> correct:
    now need to open a listener to the blockchain so that it updates automatically
*/ 
app.get("/ping-ether", function(req, res){

    var coins = web3.eth.getBalance(user0)["c"][0];
    res.send("user account ID: " + user0 + "\n with networth: " + coins);

});


/**
    now let's open a live pipe to the blockchain so the amount of coins mined is cointinously updated

    1. first it makes sense to open a live pipe that constant updates => maybe read the docs to see what's already there?
    2. problem: the API seems to be incomplete, things exist but are not implemented??
    3. possible solution: 
        - roll your own
            pros: use existing lib 
            cons: would it behave in ways that you don't understand?
        - use web3 1.0.0.
            pros: may be tested by pros
            cons: API will most likely change, all your current stuff will break 

        decision: use beta and learn the new API since:
            - subscriber already implemented
            - have to learn it eventually anyways

    plan:       
        1. install web3 1.0.0
        2. figure out how to access user account information asyncronously
        3. figure out subscribers and print to console
        4. figure out subscrribers and print to front end html

*/ 
console.log("user0: ", user0)


// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));




