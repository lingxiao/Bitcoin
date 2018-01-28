pragma solidity ^0.4.2;

contract Charity{



	mapping (address => uint) public coinBalanceOf;
	event CoinTransfer(address sender, address receiver, uint amount);


	/* 
		initalize the contract with what creater of contract has
		initially
	*/
	function charity(uint supply){

		coinBalanceOf[msg.sender] = supply;
	}

	/* 
		now send coins to receiver
	*/
	function sendCoin(address receiver, uint amount) returns (bool sufficient)
	{

		if (coinBalanceOf[msg.sender] < amount) return false;

		coinBalanceOf[msg.sender] -= amount;
		coinBalanceOf[receiver]   += amount;

		CoinTransfer(msg.sender, receiver, amount);

		return true;

	}


	/* 
		getter for coinBalanceOf
	*/
	function readBalance() returns (uint wallet){

		return coinBalanceOf[msg.sender];
	}

	function 


}



