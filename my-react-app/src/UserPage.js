// UserPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo192.png';
import './UserPage.css'; // Импорт стилей
import Profile from './Profile';

function UserPage() {
  const [showProfile, setShowProfile] = useState(false);

  // Получаем состояние профиля из localStorage при загрузке страницы
  useEffect(() => {
    const profileState = localStorage.getItem('profileState');
    if (profileState) {
      setShowProfile(JSON.parse(profileState));
    }
  }, []);

  const handleProfileClick = () => {
    // Инвертируем состояние профиля
    const newState = !showProfile;
    setShowProfile(newState);
    // Сохраняем состояние профиля в localStorage
    localStorage.setItem('profileState', JSON.stringify(newState));
  };

  return (
    <div className="user-page">
      <header className='header'>
        <div className="logo">
          <img src={logo} alt="Логотип" />
        </div>
        <div className="title">Blockchat</div>
        <div className="exit">
          <Link to="/"><button className='buttonlog-e'>Выйти</button></Link>
        </div>
      </header>
      <div className='body-user'>
        <div className='left-body'> 
          <div className='button_profile'>
            <button onClick={handleProfileClick}>Профиль</button>
          </div>
          {/* Остальные кнопки */}
        </div>
        <div className='right-body'>
          {showProfile && <Profile />}
          {/* Остальные компоненты */}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
