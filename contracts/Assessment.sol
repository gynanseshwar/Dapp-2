// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public fixedDepositBalance;
    uint256 public fixedDepositDuration;
    uint256 public fixedDepositStartTime;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event FixedDeposit(uint256 amount, uint256 durationInYears);
    event WithdrawFixedDeposit(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function fixedDeposit(uint256 _amount, uint256 _durationInYears) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_durationInYears >= 1, "Duration should be at least 1 year");
        fixedDepositBalance += _amount;
        fixedDepositDuration = _durationInYears;
        fixedDepositStartTime = block.timestamp;
        emit FixedDeposit(_amount, _durationInYears);
    }

    function withdrawFixedDeposit() public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(block.timestamp >= fixedDepositStartTime + (fixedDepositDuration * 1 minutes), "Fixed deposit is not matured yet");
        uint256 withdrawalAmount = fixedDepositBalance;
        fixedDepositBalance = 0;
        balance += withdrawalAmount;
        emit WithdrawFixedDeposit(withdrawalAmount);
    }
}
