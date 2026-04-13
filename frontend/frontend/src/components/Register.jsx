import React, { useState } from 'react';
import { Loader2, UserPlus } from 'lucide-react';

function Register({ onRegister }) {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname, username, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
                setTimeout(() => {
                    onRegister && onRegister();
                }, 1500);
            } else {
                setError(data.message || 'Error al registrarse');
            }
        } catch (err) {
            setError('Error de red');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="text-center mb-2">
                <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">Crea tu cuenta</h2>
                <p className="text-sm text-gray-400 font-light">Únete para organizar tus prioridades</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Nombre</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                        required
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Apellido</label>
                    <input 
                        type="text" 
                        value={lastname} 
                        onChange={e => setLastname(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                        required
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Usuario</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                    required
                />
            </div>
            
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
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
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                    required
                />
            </div>

            {error && (
                <div className="bg-red-500/10 text-red-300 text-sm p-3 rounded-xl border border-red-500/20 text-center font-medium">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-emerald-500/10 text-emerald-300 text-sm p-3 rounded-xl border border-emerald-500/20 text-center font-medium">
                    {success}
                </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-gray-200 mt-2 font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                {isLoading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
        </form>
    );
}

export default Register;
