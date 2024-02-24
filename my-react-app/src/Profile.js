import React from 'react';
import WalletConnect from './WalletConnect.js';
import Transfer from './components/Transfer.jsx'

function Profile() {
  return (
    <div className="profile">
      <h2>Профиль пользователя</h2>
      <p>Имя: John Doe</p>
      <p>Возраст: 30 лет</p>
      <p>Город: Нью-Йорк</p>
      {/* Добавьте кнопку Connect Wallet */}
      <WalletConnect />
      <br></br>
      <Transfer />
    </div>
  );
}

export default Profile;
