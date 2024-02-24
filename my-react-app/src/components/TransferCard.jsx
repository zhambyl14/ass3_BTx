import React, { useContext } from 'react'
import { TransactionContext } from '../Context'

import '../App.css'

function TransferCard() {
  const { handleChange, loading, form, makeTransaction } = useContext(
    TransactionContext,
  )
  return (
    <div className="bg-slate-900 p-4 my-3 rounded-l-2xl w-full shadow-xl">
      <input
        type="text"
        placeholder="To Account"
        className="rounded"
        name="addressTo"
        onChange={(e) => handleChange(e, 'addressTo')}
      />
      <input
        type="number"
        placeholder="Amount"
        step={0.0001}
        className="rounded"
        name="amount"
        min={0}
        onChange={(e) => handleChange(e, 'amount')}
      />
      <input
        type="text"
        placeholder="Message"
        className="rounded"
        name="message"
        onChange={(e) => handleChange(e, 'message')}
      />
      {loading ? (
        <div className="flex justify-center items-center py-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700" />
        </div>
      ) : (
        <button
          className="button-connect"
          onClick={() => {
            const { addressTo, amount, message } = form
            if (!addressTo || !amount || !message) return
            makeTransaction()
          }}
        >
          Send Now
        </button>
      )}
    </div>
  )
}

export default TransferCard
