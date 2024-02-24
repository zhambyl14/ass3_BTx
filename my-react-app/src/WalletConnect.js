
import React, { useState } from "react";
import { ethers } from 'ethers';
import './App.css'

const WalletConnect = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangedHandler(result[0]);
            })
            .catch(error => {
                setErrorMessage("Error connecting wallet");
                console.error(error);
            });
        } else {
            setErrorMessage("Install Metamask");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
    }

    const getUserBalance = async (address) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);
        setUserBalance(balanceInEth);
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
    
    return (
        <div className="walletConnect">
            <div className='accountDisplay'>   
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>   
                <h3>Balance: {userBalance}</h3>
            </div>
            <button className="button-connect" onClick={connectWalletHandler}>{connButtonText}</button>
            {errorMessage}
        </div>
    )

}

export default WalletConnect;
