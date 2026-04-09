import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: "Переходи на O! Комбо",
      category: "Для смартфона",
      price: 540,  // сом/4 недели
      description: "80 ГБ интернета + 40 минут на другие сети + безлимит внутри O! + 40 ТВ-каналов + 2 бесплатные комбо-опции",
      inStock: true,  // всегда true для тарифов
      image: "https://o.kg/images/tariff-combo.jpg"  // если нет — используй placeholder или Unsplash "mobile internet"
    },
    {
      id: 2,
      name: "Переходи на O! Комбо Макс",
      category: "Для смартфона",
      price: 690,
      description: "100 ГБ + 100 минут + безлимит внутри + ТВ + 2 комбо-опции бесплатно",
      inStock: true,
      image: "https://o.kg/images/tariff-max.jpg"
    },
    {
      id: 3,
      name: "Переходи на O! Комбо Безлимит",
      category: "Безлимит",
      price: 850,
      description: "Безлимитный интернет + 200 минут + ТВ-каналы + комбо-опции",
      inStock: true,
      image: "https://o.kg/images/tariff-unlim.jpg"
    },
    {
      id: 4,
      name: "Семья Премиум 3",
      category: "Для семьи",
      price: 1490,  // скидка на 3 мес, обычно 1990
      description: "Безлимит + 100 минут + 10 ГБ + домашний интернет + ТВ + 3 SIM-карты для семьи",
      inStock: true,
      image: "https://o.kg/images/tariff-family.jpg"
    },
    {
      id: 5,
      name: "Оңой+",
      category: "Базовые",
      price: 1,  // 1 сом за МБ/мин/SMS — без абонентки
      description: "Плати только за использование: 1 сом за МБ интернета, 1 сом/мин звонки, 1 сом SMS",
      inStock: true,
      image: "https://o.kg/images/tariff-onoy.jpg"
    },
    {
      id: 6,
      name: "Пайдалуу",
      category: "Базовые",
      price: 100,  // 30 дней
      description: "100 минут внутри O! + 1 сом/МБ интернет + выгодные звонки",
      inStock: true,
      image: "https://o.kg/images/tariff-paydaluu.jpg"
    }
  ],
  filter: 'Все'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    toggleStock(state, action) {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.inStock = !product.inStock;
      }
    },
  },
});

export const { setFilter, toggleStock } = productsSlice.actions;
export default productsSlice.reducer;
