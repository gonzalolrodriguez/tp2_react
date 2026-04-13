import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { motion, AnimatePresence } from 'framer-motion';

function Auth({ onLogin, user, setPage }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[85vh] w-full px-4 relative z-10"
        >
            <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden mt-8">
                {/* Custom Tabs */}
                <div className="flex border-b border-white/10 bg-white/[0.02]">
                    <button 
                        className={`flex-1 py-5 text-sm font-medium transition-colors relative ${showLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setShowLogin(true)}
                    >
                        Iniciar sesión
                        {showLogin && (
                            <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                        )}
                    </button>
                    <button 
                        className={`flex-1 py-5 text-sm font-medium transition-colors relative ${!showLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setShowLogin(false)}
                    >
                        Registrarse
                        {!showLogin && (
                            <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                        )}
                    </button>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {showLogin ? (
                            <motion.div 
                                key="login" 
                                initial={{ opacity: 0, x: -20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Login onLogin={onLogin} />
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="register" 
                                initial={{ opacity: 0, x: 20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Register onRegister={() => setShowLogin(true)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

export default Auth;
