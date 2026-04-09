// src/pages/Home.jsx  (или прямо в App.js)
import React, { useState, useEffect } from 'react';
import fakeTariffs from '../data/fake-tariffs.json'; // ← только этот JSON!

function Home() {
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState(null);

  useEffect(() => {
    // Имитация задержки от сервера (1.5–3 секунды)
    const delay = Math.floor(Math.random() * 1500) + 1500; // 1500–3000 мс

    const timer = setTimeout(() => {
      setTariffs(fakeTariffs.tariffs);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (tariff) => {
    setSelectedTariff(tariff);
  };

  const closeDetail = () => {
    setSelectedTariff(null);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0a0a0a, #120015)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#ff69b4',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '0 0 20px #ff69b4'
      }}>
        <div>Загрузка неоновых тарифов... 💗</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #120015 100%)',
      color: '#ffffff',
      padding: '100px 20px 40px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Блок 1: Приветствие */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Добро пожаловать в O! НЕОН
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
          Самые яркие тарифы Кыргызстана
        </p>
      </section>

      {/* Блок 2: Преимущества (статичный контент) */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem', 
        marginBottom: '5rem' 
      }}>
        {[
          { title: "Скорость 5G", desc: "Мгновенная загрузка" },
          { title: "Безлимит в мессенджерах", desc: "Общайся без границ" },
          { title: "Гибкие тарифы", desc: "Выбирай под себя" }
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,105,180,0.08)',
            border: '1px solid rgba(255,105,180,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            backdropFilter: 'blur(8px)'
          }}>
            <h3 style={{ color: '#ff69b4', marginBottom: '1rem' }}>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Блок 3: LIST / DETAIL — тарифы */}
      <section>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          color: '#ff69b4', 
          marginBottom: '2.5rem',
          textShadow: '0 0 15px rgba(255,105,180,0.5)'
        }}>
          Тарифы
        </h2>

        {selectedTariff ? (
          // DETAIL VIEW
          <div style={{
            maxWidth: 600,
            margin: '0 auto',
            background: 'rgba(18,18,18,0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid #ff69b4',
            boxShadow: '0 0 40px rgba(255,105,180,0.3)',
            position: 'relative'
          }}>
            <button 
              onClick={closeDetail}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: '#ff69b4',
                fontSize: '1.8rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>

            <h2 style={{ color: '#ff69b4', marginBottom: '1.5rem' }}>
              {selectedTariff.name}
            </h2>
            
            <div style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {selectedTariff.price} <small style={{ fontSize: '1.2rem' }}>сом / {selectedTariff.period}</small>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', lineHeight: 2 }}>
              <li>Интернет: {selectedTariff.gb === 999 ? 'Безлимит' : `${selectedTariff.gb} ГБ`}</li>
              <li>Минуты: {selectedTariff.minutes}</li>
              <li>Соцсети: {selectedTariff.unlimSocial ? 'Безлимит' : 'По тарифу'}</li>
              {selectedTariff.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>

            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
              {selectedTariff.description}
            </p>

            <button style={{
              width: '100%',
              padding: '1.2rem',
              background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
              border: 'none',
              borderRadius: '999px',
              color: '#000',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(255,105,180,0.6)'
            }}>
              ПОДКЛЮЧИТЬ СЕЙЧАС
            </button>
          </div>
        ) : (
          // LIST VIEW
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {tariffs.map(tariff => (
              <div 
                key={tariff.id}
                onClick={() => handleSelect(tariff)}
                style={{
                  background: 'rgba(18,18,18,0.7)',
                  borderRadius: '16px',
                  padding: '1.8rem',
                  border: tariff.popular ? '2px solid #ff69b4' : '1px solid rgba(255,105,180,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: tariff.popular ? '0 0 30px rgba(255,105,180,0.4)' : 'none'
                }}
              >
                {tariff.popular && (
                  <div style={{
                    background: '#ff69b4',
                    color: '#000',
                    display: 'inline-block',
                    padding: '0.3rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    ПОПУЛЯРНЫЙ
                  </div>
                )}

                <h3 style={{ color: '#ff69b4', marginBottom: '0.8rem' }}>
                  {tariff.name}
                </h3>

                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {tariff.price} <small>сом</small>
                </div>

                <p style={{ margin: '1rem 0', opacity: 0.8 }}>
                  {tariff.gb === 999 ? 'Безлимит' : `${tariff.gb} ГБ`} • {tariff.minutes} мин
                </p>

                <button style={{
                  marginTop: '1rem',
                  padding: '0.8rem 1.5rem',
                  background: 'transparent',
                  border: '2px solid #ff69b4',
                  color: '#ff69b4',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}>
                  Подробнее →
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;