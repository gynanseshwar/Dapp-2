# Smart ATM - Ethereum Smart Contract & React Frontend

## Overview

This project implements a simple Smart ATM system using Ethereum blockchain smart contracts and a React frontend. Users can interact with the ATM functionalities like depositing, withdrawing, and viewing account details.

### Files Included

- **`HomePage.js`**: React component handling the frontend logic.
- **`Assessment.sol`**: Ethereum smart contract defining the ATM functionality.

## Getting Started

### Prerequisites

- Node.js installed.
- MetaMask extension in your browser for Ethereum wallet functionality.

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the project using `npm start`.

## Usage

- Access the application via your browser after starting the project.
- Connect your MetaMask wallet to interact with the Smart ATM.
- Deposit and withdraw ETH (Ethereum) from the ATM.
- View account details, including account balance and owner information.
- Generate a QR code for receiving funds.

## Smart Contract Details (Assessment.sol)

### Contract Functions

- `getBalance()`: View the current balance in the account.
- `deposit(uint256 _amount)`: Deposit ETH into the account.
- `withdraw(uint256 _withdrawAmount)`: Withdraw ETH from the account.
- `fixedDeposit(uint256 _amount, uint256 _durationInYears)`: Create a fixed deposit with a specified amount and duration.
- `withdrawFixedDeposit()`: Withdraw the matured fixed deposit amount.

### Events

- `Deposit(uint256 amount)`: Emit event on deposit.
- `Withdraw(uint256 amount)`: Emit event on withdrawal.
- `FixedDeposit(uint256 amount, uint256 durationInYears)`: Emit event on fixed deposit creation.
- `WithdrawFixedDeposit(uint256 amount)`: Emit event on withdrawal of fixed deposit.

## Frontend Details (HomePage.js)

### React Component Features

- Connects MetaMask wallet.
- Displays account details, balance, and ATM functionalities.
- Generates a QR code for receiving funds.
- Shows/hides passbook details.
- Handles deposit and withdrawal actions.


# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm install qrcode.react 
then type  npm i after instlattion
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Author

Gynaneshwar

din088oss55@gmail.com
