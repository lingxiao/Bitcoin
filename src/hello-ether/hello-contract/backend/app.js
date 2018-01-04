/**
	@file app.js
	@author Xiao Ling <lingxiao@seas.upenn.edu>
	@date 1/3/2018
	@Note: this hangs when running console with node app.js
*/


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



