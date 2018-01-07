/**
	@file app.js
	@author Xiao Ling <lingxiao@seas.upenn.edu>
	@date 1/3/2018
	@Note: this hangs when running console with node app.js
*/

const Web3    = require("web3");
const pr      = require("../prelude");
const path    = require("path")
const express = require("express");

var web3 = new Web3();

/**
    set up server using express

    problem: right now there is a package setup problem... may behoove
    me to slow down and do it right once again?

    problem: right now the stuff is very confusing, maybe set up a new 
    minimal application? but then you get all this shit ... 
    what if I installed it here.. get it working here. and then transfer over?
    
    strategy:
        1. serve an html web app here
        2. 

*/

// launch app
var app = express()

app.use(express.static("voting"))

// URL map to resource
app.get("/"        , (req, res) => res.send("hello world!!!"));
app.get("/about"   , (req, res) => res.send("hello from about page"));
app.get("/contact" , (req, res) => res.send("contact me at mememe@me.com"));

// now we want to serve an xxx.html 
app.get("/hello"  , function(req, res){

    res.sendFile("/hello.html")

})



// now we want to interact with the xxx.html so that events are heard in the back



// look for pub-sub primitives, not callback stuff in documentation



// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));






/**


const LoginContract = require("./login_contract.js");
const loginContract = LoginContract.at("0xf7b06365e9012592c8c136b71c7a2475c7a94d71")


// LoginAttempt is the name of the event that signals logins in the
// Login contract. This is specified in the login.sol file.
const loginAttempt = loginContract.LoginAttempt();

const challenges = {};
const successfulLogins = {};

loginAttempt.watch((error, event) => {

    if(error) {
    	console.log("Error while login in:")
        console.log(error);
        return;
    }

    console.log(event);

    const sender = event.args.sender.toLowerCase();

    // If the challenge sent through Ethereum matches the one we generated,
    // mark the login attempt as valid, otherwise ignore it.
    if(challenges[sender] === event.args.challenge) {
    	console.log("success branch")
        successfulLogins[sender] = true;
    }
});



*/
