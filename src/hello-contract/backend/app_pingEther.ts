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
// const pr      = require("../lib/prelude");
// const express = require("express");
// const Web3    = require("web3");
import * as Web3    from 'web3'     ; 
import * as express from 'express'  ;
const pr = require("../lib/prelude");

// launch web app and web3
var app  = express();

// URL map to resource
app.get("/", (req, res) => res.send("hello world from ping ether application"));

/**
    this is incorrect, need to use websockets
*/
app.get('/inject', (req, res) => {

    res.write("this is the front end on load...")

    setInterval(() => {

        // console.log("fire")
        res.write(`hello world ${Math.floor(Math.random()*100)}`);


    }, 10000);

});



app.listen(3000, () => console.log("web app listening on port 3000"));



