// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';
// import TodoDetail from './pages/TodoDetail';   // временно закомментируем

function App() {
  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '90px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<TodoList />} />
          {/* <Route path="/todo/:id" element={<TodoDetail />} /> */}
        </Routes>
      </main>
      
      <Footer />
    </>
  );
}

export default App;