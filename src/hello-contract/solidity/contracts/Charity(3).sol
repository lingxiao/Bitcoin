pragma solidity ^0.4.4;

/* 
Contract that allows charities to receive donations directly from users of 
the ethereum blockchain

If you need help with syntax, check out http://solidity.readthedocs.io/en/develop/
If you have any other questions, reach out to pillaip@wharton.upenn.edu

The following functions must be implemented. 
1) onlyBefore (modifier)
2) donate
3) amountDonated
4) withdraw
*/

contract Charity {

  // store the address of the creator of the contract
  address owner; 
  // store the amount of money donated any address
  mapping(address=>uint) donors;
  // store the min amount that can be donated
  uint minDonation;
  // store the start time and end time
  uint startTime;
  uint endTime;

  // constructor is provided for you
  function Charity(uint _minDonation, uint _endTime) public {
    owner       = msg.sender;
    minDonation = _minDonation;
    startTime   = now;
    endTime     = _endTime;
  }

  /* 
  Sometimes you want to restrict who can call certain functions in your smart contract.
  Modifiers are used to restrict access to certain functions. The onlyBy modifier 
  below only allows a function to be called by some address _user. If a
  different user attempts to call a function with this modifier, the transaction
  will "throw"--meaning it will not go through, and any changes that it caused
  earlier in the function will be reverted.

  TO CHECK CONDITIONS, RATHER THAN USING CONVENTIONAL IF STATEMENTS, USE
  THE KEYWORD "REQUIRE". IF, FOR EXAMPLE, YOU ONLY WANTED THIS FUNCTION TO 
  EXECUTE IF _AMOUNT WAS LESS THAN 10, YOU COULD ADD THE FOLLOWING LINE TO 
  THE BEGINNING OF THE FUNCTION:

  require(_amount < 10);
  ...
  (this code block will not be reached if require is greater than 10...)
  ...
   
  See the withdraw function to see how such a modifier might be used. 
  */
  modifier onlyBy(address _user) {
    require(msg.sender == _user);
    _;
  }

  // NOW WRITE YOUR OWN MODIFIER BELOW, ONLY ALLOWING A FUNCTION TO BE CALLED
  // BEFORE A CERTAIN TIME. MAKE SURE TO INCLUDE AN UNDERSCORE(_;) AT THE END
  // WHICH WILL ALLOW OTHER CODE TO BE RUN AFTER YOUR MODIFIER 
  modifier onlyBefore(uint _time) {
    //insert code here
    require(block.timestamp < _time);
    _;
  }

  /*
    WRITE THE DONATE FUNCTION BELOW. 

    THE DONATE FUNCTION ALLOWS USERS TO SEND MONEY TO THE CONTRACT
    AND UPDATES THEIR BALANCE IN THE DONORS MAPPING

    REMEMBER THAT YOU CAN ACCESS THE SENDER'S ADDRESS THROUGH MSG.SENDER
    AND THE AMOUNT OF MONEY THEY SENT WITH THE FUNCTION CALL VIA MSG.VALUE.
    THESE ARE INHERENT VARIABLES IN ANY FUNCTION CALL, AND ARE NOT ARGUMENTS 
    TO THE DONATE FUNCTION.

    YOU DO NOT NEED TO UPDATE THE BALANCE OF THE CONTRACT ITSELF. 
    IT AUTOMATICALLY UPDATES WHEN SENT MONEY. IF YOU EVER WANT TO ACCESS
    THE CURRENT ETHER BALANCE OF THE CONTRACT, USE THE VARIABLE THIS.BALANCE.

    BE SURE TO ADD THE ONLYBEFORE MODIFIER YOU JUST WROTE TO MAKE SURE NOBODY CAN
    CALL THIS FUNCTION AFTER THE ENDTIME FOR CHARITABLE DONATIONS. 

    NOTE THE "PAYABLE" MODIFIER ALLOWS THIS FUNCTION TO HANDLE ETHER
  */
  function donate() public payable returns (bool success) {

    // insert code here

    // assert blockTime < endTime
    onlyBefore(endTime);

    // assert value of donation is less than balance
    require(this.balance > msg.value);

    // send message to msg.sender



  }

  /*
  AMOUNT DONATED FUNCTION USES THE DONORS MAPPING TO FIND OUT THE AMOUNT
  sOF MONEY DONATED BY A PARTICULAR ADDRESS, AND RETURNS THAT VALUE.
  */
  function amountDonated(address _donor) public returns (uint amount) {
  	// insert code here
  }

  /*
  WITHDRAW FUNCTION ALLOWS THE OWNER OF THE CHARITY TO WITHDRAW MONEY
  FROM THE SMART CONTRACT. 

  THIS FUNCTION SHOULD ONLY SEND MONEY IF THE OWNER OF THE CONTRACT 
  CALLS THIS FUNCTION. 

  THE SYNTAX FOR SENDING MONEY TO AN ADDRESS IS <ADDRESS>.TRANSFER. (fill in the address, don't actually write <ADDRESS>)
  */
  function withdraw(uint _amount) public payable onlyBy(owner) returns (bool success) {
    //insert code here
  }

}
