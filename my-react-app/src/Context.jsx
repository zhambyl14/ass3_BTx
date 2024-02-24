import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from './utils/constants'

export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('')
  const [form, setForm] = useState({ addressTo: '', amount: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState([])

  //Set form data whenever form fields are changed
  const handleChange = (e, name) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
  }

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionContract = getEthereumContract()
        const latestTransactions = await transactionContract.getAllTransactions()
        const structure = latestTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000,
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }))
        console.log(structure)
        setTransactions(structure)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const makeTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, message } = form
        const transactionContract = getEthereumContract()
        const parsedEther = ethers.utils.parseEther(amount)
        console.log({
          connectedAccount,
          addressTo,
          amount,
          message,
          parsedEther,
        })

        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: connectedAccount,
              to: addressTo,
              gas: '0x5208',
              value: parsedEther._hex,
            },
          ],
        })

        const transactionHash = await transactionContract.addToBlockChain(
          addressTo,
          parsedEther,
          message,
        )

        setLoading(true)
        console.log(`Loading - ${transactionHash.hash}`)
        await transactionHash.wait()
        console.log(`Success - ${transactionHash.hash}`)
        setLoading(false)
        window.location.reload()
      } else {
        console.log('No ethereum object detected')
      }
    } catch (error) {
      alert('Something went wrong try again!')
      console.error(error)
    }
  }

  //Connect metamask wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.')

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setConnectedAccount(accounts[0])
      window.location.reload()
    } catch (error) {
      console.log(error)

      throw new Error('No ethereum object')
    }
  }

  //Check if metamask wallet is connected
  const checkWalletConnected = async () => {
    if (!ethereum) return alert('Please Install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    console.log(accounts)
    try {
      if (accounts.length) {
        setConnectedAccount(accounts[0])
      } else {
        console.log('No accounts found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkWalletConnected()
    getAllTransactions()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        handleChange,
        form,
        loading,
        makeTransaction,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
