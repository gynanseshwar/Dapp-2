import { useState, useEffect } from "react";
import { ethers } from "ethers";
import QRCode from "qrcode.react";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [qrCodeData, setQRCodeData] = useState("");
  const [showPassbook, setShowPassbook] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const generateQRCode = () => {
    if (account) {
      const data = `ethereum:${account}`;
      setQRCodeData(data);
    }
  };

  const togglePassbook = () => {
    setShowPassbook(!showPassbook);
  };

  const renderPassbook = () => {
    return (
      <div>
        <p>Owner Name: Gynaneshwar</p>
        <p>Father Name: Manjunath</p>
        <p>Pan Number: HPRBM5157K</p>
        <p>Adhaar Number: 123456789103</p>
        <p>Swift Code: SBINNB3546</p>
        <p>IFSC Code: KKBK34353HJK</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    generateQRCode();
  }, [account]);

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
      </div>
    );
  };

  return (
    <main className="container">
      <header>
        <h1>Smart Atm!</h1>
      </header>
      {initUser()}
      {qrCodeData && (
        <div>
          <p>Scan the QR code to receive funds:</p>
          <QRCode value={qrCodeData} />
        </div>
      )}
      <button onClick={togglePassbook}>
        {showPassbook ? "Hide Passbook" : "Show Passbook"}
      </button>
      {showPassbook && renderPassbook()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}

