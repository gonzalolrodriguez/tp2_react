import React, { useState } from 'react';
import { Loader2, LogIn } from 'lucide-react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                onLogin(data.token, data.user);
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de red');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-1 text-center mb-2">
                <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">Bienvenido de nuevo</h2>
                <p className="text-sm text-gray-400 font-light">Ingresa tus credenciales para acceder</p>
            </div>
            
            {error && (
                <div className="bg-red-500/10 text-red-300 text-sm p-3 rounded-xl border border-red-500/20 text-center font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Usuario</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                    required
                />
            </div>
            
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Contraseña</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                    required
                />
            </div>
            
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-gray-200 mt-4 font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
                {isLoading ? 'Conectando...' : 'Entrar'}
            </button>
        </form>
    );
}

export default Login;
