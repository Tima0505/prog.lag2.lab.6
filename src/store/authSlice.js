// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронная регистрация (через middleware)
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Проверка на существование пользователя
      if (users.find(u => u.email === userData.email)) {
        return rejectWithValue('Пользователь с таким email уже существует');
      }

      const newUser = {
        id: Date.now(),
        ...userData,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронная авторизация (логин)
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return rejectWithValue('Неверный email или пароль');
      }

      // Сохраняем текущего пользователя
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('currentUser');
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;