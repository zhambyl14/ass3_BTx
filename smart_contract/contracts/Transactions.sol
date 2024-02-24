//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions{
    uint256 count;

    event Transfer(address _from, address _to, uint _amount, string message, uint256 timestamp);

    struct TransactionRecord{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransactionRecord[] transactions;

    function addToBlockChain(address payable receiver, uint amount, string memory message) public{
        count += 1;
        transactions.push(TransactionRecord(msg.sender, receiver, amount, message, block.timestamp));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function getAllTransactions() public view returns(TransactionRecord[] memory){
        return transactions;
    }
}