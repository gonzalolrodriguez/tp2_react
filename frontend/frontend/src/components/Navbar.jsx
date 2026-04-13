import React from 'react';
import { LogOut, Home, KeyRound, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar({ user, onLogout, setPage, currentPage }) {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-sm sticky top-0 z-50"
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span
                        onClick={() => setPage('home')}
                        className="font-medium text-xl text-white cursor-pointer flex items-center gap-2 tracking-tight"
                    >
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black text-xs font-bold">
                            T
                        </div>
                        Tareas
                    </span>

                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setPage('home')}
                            className={`text-sm font-medium transition-colors hover:text-white flex items-center gap-2 ${currentPage === 'home' ? 'text-white' : 'text-gray-400'}`}
                        >
                            <Home className="w-4 h-4" /> Inicio
                        </button>
                        {!user && (
                            <button
                                onClick={() => setPage('auth')}
                                className={`text-sm font-medium transition-colors hover:text-white flex items-center gap-2 ${currentPage === 'auth' ? 'text-white' : 'text-gray-400'}`}
                            >
                                <KeyRound className="w-4 h-4" /> Acceder
                            </button>
                        )}
                        {user && (
                            <button
                                onClick={() => setPage('tasks')}
                                className={`text-sm font-medium transition-colors hover:text-white flex items-center gap-2 ${currentPage === 'tasks' ? 'text-white' : 'text-gray-400'}`}
                            >
                                <CheckSquare className="w-4 h-4" /> Mis tareas
                            </button>
                        )}
                    </nav>
                </div>

                {user && (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 font-medium text-sm hidden sm:block">
                            {user.name}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onLogout}
                            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full px-5 py-2 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Salir</span>
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.header>
    );
}

export default Navbar;
