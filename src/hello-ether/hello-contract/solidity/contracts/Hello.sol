pragma solidity ^0.4.2;

contract mortal {

	/* define variable owner of the type :: address */
	address owner;

	/* This functioin is executed at init and sets the owner of the contract 
		Note this is basically an init() functioin in python
	*/ 
	function mortal(){ 
		owner = msg.sender; 
	}

	/* This function recovers the fund on the contract */ 
	function kill(){

		if (msg.sender == owner ) selfdestruct(owner);

	}

}


contract greeter is mortal {

	/*
		define variable greeting of the type :: string
		note sol is statically typed
	*/ 
	string greeting;

	/*
		runs when the contract is executed
		note the initializer can take in a parameter
	*/ 
	function greeter(string _greeting){

		greeting = _greeting;
	}

	/*
		main function
	*/ 
	function greet() constant returns (string){

		return greeting;

	}


}


























