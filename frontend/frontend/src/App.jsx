import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

function getStoredUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
function getStoredToken() {
  return localStorage.getItem('token') || '';
}

function App() {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [page, setPage] = useState('home');

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setPage('tasks');
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setPage('home');
  };

  useEffect(() => {
    if (getStoredToken() && getStoredUser() && !user && !token) {
      setToken(getStoredToken());
      setUser(getStoredUser());
    }
  }, []);

  const renderPage = () => {
    if (page === 'home') return <Home setPage={setPage} user={user} key="home" />;
    if (page === 'auth') return <Auth onLogin={handleLogin} key="auth" />;
    if (page === 'tasks') {
        if (!user) {
            return (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-center mt-12"
                    key="no-tasks"
                >
                    <p className="text-secondary text-lg mb-4">Debes iniciar sesión para ver tus tareas.</p>
                    <button onClick={() => setPage('auth')} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-black transition-colors font-medium">
                        Iniciar Sesión
                    </button>
                </motion.div>
            );
        }
        return <Tasks token={token} key="tasks" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-primary overflow-x-hidden">
      <Navbar user={user} onLogout={handleLogout} setPage={setPage} currentPage={page} />
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="popLayout">
            {renderPage()}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
