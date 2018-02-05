pragma solidity ^0.4.2;

contract Charity{



	mapping (address => uint) public coinBalanceOf;
	event CoinTransfer(address sender, address receiver, uint amount);


	/* 
		initalize the contract with what creater of contract has
		initially
	*/
	function Charity(uint supply){

		coinBalanceOf[msg.sender] = supply;
	}

	/* 
		now send coins to receiver
	*/
	function sendCoin(address receiver, uint amount) returns (bool sufficient)
	{

		require(coinBalanceOf[msg.sender] > amount);

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

	function ping() public constant returns (uint num) {
		return 200;
	}

    function pong() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
    }	



}



