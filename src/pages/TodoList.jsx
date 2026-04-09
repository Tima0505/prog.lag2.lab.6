// src/pages/TodoList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../store/todoSlice';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos?.todos || []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title, description }));
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a, #120015)',
      color: '#fff',
      padding: '100px 20px'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '3.5rem', 
        marginBottom: '3rem',
        background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Todo List
      </h1>

      {/* Форма добавления */}
      <form onSubmit={handleSubmit} style={{ 
        maxWidth: '600px', 
        margin: '0 auto 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '15px', borderRadius: '12px', border: 'none', background: '#222', color: '#fff', fontSize: '1.1rem' }}
          required
        />
        <input
          type="text"
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '15px', borderRadius: '12px', border: 'none', background: '#222', color: '#fff' }}
        />
        <button type="submit" style={{
          padding: '16px',
          background: 'linear-gradient(90deg, #ff2e63, #ff69b4)',
          border: 'none',
          borderRadius: '12px',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          cursor: 'pointer'
        }}>
          + Добавить задачу
        </button>
      </form>

      {/* Список задач */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.5rem', opacity: 0.6 }}>Пока нет задач</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} style={{
              background: 'rgba(18,18,18,0.85)',
              marginBottom: '16px',
              padding: '20px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: todo.completed ? '2px solid #4caf50' : '1px solid #ff69b4'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : '#fff',
                  marginBottom: '6px'
                }}>
                  {todo.title}
                </h3>
                {todo.description && <p style={{ opacity: 0.8 }}>{todo.description}</p>}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate(`/todo/${todo.id}`)}
                  style={{
                    padding: '10px 18px',
                    background: '#555',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Подробнее
                </button>

                <button
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{
                    padding: '10px 18px',
                    background: todo.completed ? '#555' : '#4caf50',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {todo.completed ? '↩' : '✓'}
                </button>

                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  style={{
                    padding: '10px 18px',
                    background: '#ff2e63',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;