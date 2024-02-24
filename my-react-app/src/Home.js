// Home.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo192.png';
import './Home.css'; // Импорт стилей

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  return (
    <header className='header'>
      {!isLoginPage && (
        <>
          <div className="logos">
            <img src={logo} alt="Логотип" />
          </div>
          <div className="title">Blockchat</div>
          <div className="login">
            <Link to="/login"><button className='buttonlog'>Вход</button></Link>
          </div>
        </>
      )}
    </header>
  );
}

function Home() {
  return (
    <div className="home-page">
      <Header />
      <h1>Главная страница</h1>
    </div>
  );
}

export default Home;