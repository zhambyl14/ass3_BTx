// LoginPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'
function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Здесь можно добавить логику для проверки данных пользователя
    // После успешного входа перенаправляем на страницу пользователя
    navigate('/user');
  };

  return (
    <div className="login-page">
      <div className='logger'>
      <h1>Страница входа</h1>
      <form  onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className='button-log' type="submit">Войти</button>
      </form>
      <button className='button-log' ><Link to="/" className='nolink'>Вернуться на главную</Link></button>
      
      </div>
    </div>
  );
}

export default LoginPage;