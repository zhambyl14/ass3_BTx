import React, { useContext } from 'react'
import { TransactionContext } from '../Context'

function Transactions() {
  const { connectedAccount, transactions } = useContext(TransactionContext)

  return (
    <div className="w-full bg-slate-900 p-2 ">
      <h3 className="text-yellow-500 text-xl">Latest Transactions</h3>
      <div className="w-full h-px bg-white"></div>
      <div className="flex flex-wrap text-white">
        {transactions.length === 0 ? (
          <p>No transactions yet...</p>
        ) : (
          transactions.map((transaction) => {
            return (
              <div
                className="bg-rose-800 rounded p-3 w-fit m-2"
                key={transaction.timestamp}
              >
                <p>
                  <span className="text-black font-bold">From:&nbsp;</span>
                  <a
                    href={`https://ropsten.etherscan.io/address/${connectedAccount}`}
                    className="hover:text-blue-800 font-medium"
                  >
                    {transaction.addressFrom.slice(0, 2) +
                      '***' +
                      transaction.addressFrom.slice(38, 42)}
                  </a>
                </p>
                <p>
                  <span className="text-black font-bold">To:&nbsp;</span>
                  <a
                    href={`https://ropsten.etherscan.io/address/${connectedAccount}`}
                    className="hover:text-blue-800 font-medium"
                  >
                    {transaction.addressTo.slice(0, 2) +
                      '***' +
                      transaction.addressTo.slice(38, 42)}
                  </a>
                </p>
                <p>
                  <span className="text-black font-bold">Amount:&nbsp;</span>
                  {transaction.amount} ETH
                </p>
                <p>
                  <span className="text-black font-bold">Time:&nbsp;</span>
                  {transaction.timestamp}
                </p>
                <p>
                  <span className="text-black font-bold">Message:&nbsp;</span>
                  {transaction.message}
                </p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Transactions
