// src/store/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    {
      id: 1,
      title: "Купить продукты",
      description: "Молоко, хлеб, яйца",
      completed: false,
      createdAt: "2026-02-27"
    },
    {
      id: 2,
      title: "Сдать лабораторную",
      description: "Todo List с CRUD и Detail",
      completed: true,
      createdAt: "2026-02-26"
    },
    {
      id: 3,
      title: "Позвонить маме",
      description: "",
      completed: false,
      createdAt: "2026-02-27"
    }
  ]
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // CREATE
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        createdAt: new Date().toISOString().split('T')[0]
      });
    },

    // UPDATE (toggle completed)
    toggleTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // UPDATE (edit title and description)
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
      }
    },

    // DELETE
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  }
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;