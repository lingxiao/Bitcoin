pragma solidity ^0.4.2;


// Solidity
contract MyContract {
    function pong() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
    }
}