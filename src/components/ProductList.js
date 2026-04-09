import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/productsSlice';

function ProductList() {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state) => state.products);

  const categories = ['Все', 'Для смартфона', 'Безлимит', 'Для семьи', 'Базовые'];

  const filteredItems =
    filter === 'Все'
      ? items
      : items.filter((item) => item.category === filter);

  const handleConnect = (tariff) => {
    alert(`Подключение тарифа "${tariff.name}" — ${tariff.price} сом. Заявка отправлена!`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #120015 100%)',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '40px 20px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '3.5rem',
          fontWeight: 900,
          marginBottom: '3rem',
          background: 'linear-gradient(90deg, #ff2e63, #ff69b4, #ff1493)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px',
        }}
      >
        O! НЕОН
      </h1>

      {/* Неоновые фильтры */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setFilter(cat))}
            style={{
              padding: '0.8rem 1.8rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '999px',
              background: filter === cat ? '#ff69b4' : 'transparent',
              color: filter === cat ? '#000' : '#ff69b4',
              border: filter === cat ? 'none' : '2px solid #ff69b4',
              boxShadow:
                filter === cat
                  ? '0 0 25px rgba(255, 105, 180, 0.7), 0 0 50px rgba(255, 105, 180, 0.4)'
                  : '0 0 15px rgba(255, 105, 180, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Карточки тарифов — неон минимализм */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {filteredItems.map((tariff) => (
          <div
            key={tariff.id}
            style={{
              background: 'rgba(18, 18, 18, 0.7)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(255, 105, 180, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 105, 180, 0.08)',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow =
                '0 20px 60px rgba(255, 105, 180, 0.25), inset 0 0 30px rgba(255, 105, 180, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 105, 180, 0.08)';
            }}
          >
            <h3
              style={{
                margin: '0 0 1rem',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ff69b4',
                textShadow: '0 0 10px rgba(255, 105, 180, 0.6)',
              }}
            >
              {tariff.name}
            </h3>

            <div
              style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1.2rem',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
              }}
            >
              {tariff.price} <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>сом</span>
            </div>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.5,
                color: '#d0d0d0',
                marginBottom: '1.8rem',
              }}
            >
              {tariff.description}
            </p>

            <button
              onClick={() => handleConnect(tariff)}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
                color: '#000',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(255, 105, 180, 0.5)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 105, 180, 0.8)';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 105, 180, 0.5)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ПОДКЛЮЧИТЬ
            </button>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          color: '#888',
          fontSize: '1.1rem',
        }}
      >
        Показано {filteredItems.length} из {items.length}
      </p>
    </div>
  );
}

export default ProductList;