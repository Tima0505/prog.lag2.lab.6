import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        padding: '4rem 5% 2rem',
        color: '#aaa',
        borderTop: '1px solid rgba(255, 105, 180, 0.15)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }}>
        {/* Логотип + описание */}
        <div>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            O! НЕОН
          </div>
          <p style={{ lineHeight: 1.6, maxWidth: 280 }}>
            Современные тарифы с неоновой скоростью. Подключайся и светись ярче всех.
          </p>
        </div>

        {/* Ссылки */}
        <div>
          <h4 style={{ color: '#ff69b4', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Тарифы</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2.2 }}>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Для смартфона</a></li>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Безлимит</a></li>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Для семьи</a></li>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>eSIM</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ff69b4', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Компания</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2.2 }}>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>О нас</a></li>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Вакансии</a></li>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Пресса</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ff69b4', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Контакты</h4>
          <p>0 800 555 000</p>
          <p>support@o.kg</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            {['📸', '🐦', '📘'].map((icon) => (
              <div
                key={icon}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#ff69b4')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#222')}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: '0.9rem',
          color: '#555',
        }}
      >
        © 2026 O! НЕОН. Все права защищены. Сделано с ❤️ в Кыргызстане
      </div>
    </footer>
  );
}

export default Footer;