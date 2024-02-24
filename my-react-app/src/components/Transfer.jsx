import React, { useState } from 'react';
import TransferCard from './TransferCard';

import '../App.css'

function Transfer() {
  const [showTransferCard, setShowTransferCard] = useState(false);

  const handleTransferButtonClick = () => {
    setShowTransferCard(true);
  };

  return (
    <div className="flex flex-col w-full sm:flex-row justify-between">
      <div className="ml-4">
        {showTransferCard ? (
          <TransferCard />
        ) : (
          <button className='button-connect' onClick={handleTransferButtonClick}>Сделать трансфер</button>
          
        )}
        
      </div>
    </div>
  );
}

export default Transfer;
