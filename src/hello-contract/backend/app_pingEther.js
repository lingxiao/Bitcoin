/**
	@file: app_pingEther.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/7/2018
	@Note: web application that interacts with ethereum, pings blockchain and returns data

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
        1. install web3 1.0.0 --> done
        2. figure out how to access user account information asyncronously -> done
        3. figure out subscribers and print to console -> done
        4. figure out subscrribers and print to front end html -> to do today

*/ 
const pr      = require("../lib/prelude");
const express = require("express");
const Web3    = require("web3");

// launch web app and web3
var app  = express();


// URL map to resource
app.get("/", (req, res) => res.send("hello world from ping ether application"));

/**
    display information in the front, so this shows that we can 
    display info to the front

    hypothesis: this does update on each refresh -> correct:
        - possible reason why: res.end is only fired once ... and never fires again
        - one way to simplify a problem, open up a websocket to a dummy process that broadcassts data
        - then listen to socket and figure out how to live update

*/ 
app.get("/ping-ether", function(req, res){

    // var coins = web3.eth.getBalance(user0)["c"][0];
    // res.send("user account ID: " + user0 + "\n with networth: " + coins);
    // res.send("pinged ether, no information yet " + 123212)

    /**
        todo: refactor this block of code in an acceptable way
        after the live udpdate is done, it's possible to do some front end interaction
    */ 
    var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

    /**
        this will only fire when new blocks are added, so when transactions
        are confirmed and/or new money is minted
    */ 
    var event_newBlockHeaders = web3.eth.subscribe("newBlockHeaders", function(err, result){

        if (err){ 
         
            console.log(err);

        } else {

            let acctPromise = web3.eth.getAccounts().then(function(accts){

                let balance = web3.eth.getBalance(accts[0]).then(function(bal){

                    console.log("user: ", accts[0]);
                    console.log("balance: ", bal);
                    res.end("new balance for user: " + bal)

                });

            });
        }

    });
});

/**
    plan:
        0. first clarify the problem ... 
        1. open a dummy process that outputs stuff
        2. hook to websocket and print the info on the screen
    goal:
        1. learn how to interact with a websocket
        2. 
*/





// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));

