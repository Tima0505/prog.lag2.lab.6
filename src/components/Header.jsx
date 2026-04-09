// src/components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '1rem 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
      }}
    >
      <div
        style={{
          fontSize: '2.4rem',
          fontWeight: 900,
          background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        O! НЕОН
      </div>

      <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '1.1rem' }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Главная</span>
        <span style={{ cursor: 'pointer' }}>Тарифы</span>
        <span style={{ cursor: 'pointer' }}>SIM-карты</span>
        <span style={{ cursor: 'pointer' }}>Для семьи</span>
        <span style={{ cursor: 'pointer' }}>Поддержка</span>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '8px 18px',
              background: 'rgba(255,105,180,0.15)',
              borderRadius: '30px',
              border: '1px solid #ff69b4',
              color: '#ff69b4',
              fontWeight: '600'
            }}>
              {currentUser.name}
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 22px',
                background: '#ff2e63',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '10px 24px',
                background: 'transparent',
                border: '2px solid #ff69b4',
                color: '#ff69b4',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Войти
            </button>

            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
                border: 'none',
                color: '#000',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Регистрация
            </button>
          </div>
        )}

        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          🛒
          <div style={{
            position: 'absolute',
            top: -4,
            right: -4,
            background: '#ff2e63',
            color: '#fff',
            fontSize: '0.8rem',
            width: 20,
            height: 20,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            0
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;