// src/pages/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Защита от undefined — очень важно!
  const authState = useSelector((state) => state.auth || {});
  const { isLoading = false, error = null } = authState;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({
      email: formData.email,
      password: formData.password,
    }));

    if (!result.error) {
      alert("Добро пожаловать обратно!");
      navigate('/');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a, #120015)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: '#fff'
    }}>
      <div style={{
        background: 'rgba(18,18,18,0.95)',
        padding: '3rem',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',
        border: '2px solid #ff69b4',
        boxShadow: '0 0 40px rgba(255,105,180,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#ff69b4', marginBottom: '2rem' }}>
          Вход в O! НЕОН
        </h2>

        {error && <p style={{ color: '#ff2e63', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              margin: '10px 0', 
              borderRadius: '8px', 
              border: '1px solid #ff69b4', 
              background: '#222', 
              color: '#fff' 
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              margin: '10px 0', 
              borderRadius: '8px', 
              border: '1px solid #ff69b4', 
              background: '#222', 
              color: '#fff' 
            }}
          />

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '20px',
              background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
              border: 'none',
              borderRadius: '999px',
              color: '#000',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Нет аккаунта?{' '}
          <span 
            onClick={() => navigate('/register')} 
            style={{ color: '#ff69b4', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;