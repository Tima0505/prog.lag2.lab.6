// src/pages/Register.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Защита от undefined
  const authState = useSelector((state) => state.auth || {});
  const { isLoading = false, error = null } = authState;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Пароль должен быть не менее 6 символов");
      return;
    }

    const result = await dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }));

    if (!result.error) {
      alert("Регистрация прошла успешно!");
      navigate('/login');
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
          Регистрация в O! НЕОН
        </h2>

        {error && <p style={{ color: '#ff2e63', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ff69b4', background: '#222', color: '#fff' }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ff69b4', background: '#222', color: '#fff' }}
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ff69b4', background: '#222', color: '#fff' }}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ff69b4', background: '#222', color: '#fff' }}
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
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Уже есть аккаунт?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#ff69b4', cursor: 'pointer' }}>
            Войти
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;