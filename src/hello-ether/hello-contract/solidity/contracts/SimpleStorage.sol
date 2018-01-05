pragma solidity ^0.4.2;

contract SimpleStorage{

	uint storedData;

	event ReturnValue(address indexed _from, uint value);

	function set(uint x) public {

		storedData = x;
	}

	function get() public constant returns (uint){

		return storedData;
	}

	function change(uint _x) public returns (uint){

		ReturnValue(msg.sender, _x);
		storedData = _x;
		return storedData; 
	}

}



