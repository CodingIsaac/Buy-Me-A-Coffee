// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Coffee {
    /*
    A simple smart contract that allows users buy anyone a coffee;

    So, what are we exploring?

    1. A struct to keep track of the major data which includes, an address, name, maybe a message to the rescipient and the time it was purchased.
    2. Then a function to buy.
    3. A function to keep tract of the number of coffees bought.
    4. A withdraw function.x

    */
    address payable owner;
    // A struct to 
    struct BuyInfo {
        address from;
        uint256 timestamp;
        string recipientName;
        string message;
    }
    // Event to emit when an order is created.
    event Transfer(
        address indexed from,
        uint256 timestamp,
        string recipientName,
        string message
    );
    // list of all orders received from coffee purchased.
    BuyInfo[] info;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can call this function");
        _;
    }

    // Function to buy coffee
    function buyCoffee(string memory _recipientName, string memory _message) public payable {
        require(msg.value > 0, "Coffee is not Free");
        info.push(BuyInfo(
            msg.sender,
            block.timestamp,
            _recipientName,
            _message
        ));
        emit Transfer(msg.sender, block.timestamp, _recipientName, _message);
    }

    // Function to get total buyers balance
    function getBuyers() private view onlyOwner returns (BuyInfo[] memory) {
        return info;
    }

    function withdrawTips() public onlyOwner {
        require(owner.send(address(this).balance));
    }



}