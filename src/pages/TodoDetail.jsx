// src/pages/TodoDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../store/todoSlice';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todo = useSelector(state => 
    state.todos?.todos.find(t => t.id === Number(id))
  );

  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(todo?.title || '');
  const [editDesc, setEditDesc] = React.useState(todo?.description || '');

  if (!todo) {
    return (
      <div style={{ textAlign: 'center', marginTop: '150px', color: '#ff2e63' }}>
        <h2>Задача не найдена</h2>
        <button onClick={() => navigate('/todos')} style={{ marginTop: '20px' }}>
          Вернуться к списку
        </button>
      </div>
    );
  }

  const handleSaveEdit = () => {
    dispatch(updateTodo({
      id: todo.id,
      title: editTitle,
      description: editDesc
    }));
    setIsEditing(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a, #120015)',
      color: '#fff',
      padding: '100px 20px'
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: 'rgba(18,18,18,0.95)',
        padding: '3rem',
        borderRadius: '20px',
        border: '2px solid #ff69b4'
      }}>
        <button 
          onClick={() => navigate('/todos')}
          style={{ color: '#ff69b4', marginBottom: '2rem' }}
        >
          ← Назад к списку задач
        </button>

        {isEditing ? (
          <div>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '10px' }}
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              style={{ width: '100%', padding: '12px', height: '100px', borderRadius: '10px' }}
            />
            <button onClick={handleSaveEdit} style={{ marginRight: '10px' }}>Сохранить</button>
            <button onClick={() => setIsEditing(false)}>Отмена</button>
          </div>
        ) : (
          <>
            <h1 style={{ color: '#ff69b4', marginBottom: '1.5rem' }}>{todo.title}</h1>
            
            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {todo.description || 'Описание отсутствует'}
            </p>

            <p>
              <strong>Статус:</strong> 
              <span style={{ color: todo.completed ? '#4caf50' : '#ff9800', marginLeft: '10px' }}>
                {todo.completed ? 'Выполнено' : 'В процессе'}
              </span>
            </p>

            <p><strong>Дата создания:</strong> {todo.createdAt}</p>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '15px' }}>
              <button
                onClick={() => dispatch(toggleTodo(todo.id))}
                style={{
                  padding: '12px 24px',
                  background: todo.completed ? '#555' : '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                {todo.completed ? 'Отметить как активную' : 'Отметить как выполненную'}
              </button>

              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '12px 24px',
                  background: '#ffaa00',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Редактировать
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Удалить задачу?')) {
                    dispatch(deleteTodo(todo.id));
                    navigate('/todos');
                  }
                }}
                style={{
                  padding: '12px 24px',
                  background: '#ff2e63',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Удалить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoDetail;