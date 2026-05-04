import React, { useState, useCallback } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useGlobalContext, actions } from '../context/globalContextUtils';

function TaskForm({ onAddTask, token }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { dispatch } = useGlobalContext();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('El título es requerido');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description })
            });

            if (res.ok) {
                const data = await res.json();
                dispatch({ type: actions.ADD_ITEM, payload: data });
                setTitle('');
                setDescription('');
                if (typeof onAddTask === 'function') onAddTask();
            } else {
                const data = await res.json();
                setError(data.message || 'Error al crear tarea');
            }
        } catch {
            setError('Error de red al crear tarea');
        }
        setLoading(false);
    }, [title, description, token, dispatch, onAddTask]);

    return (
        <div className="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-2xl rounded-3xl p-6">
            <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-fuchsia-400" />
                Nueva Tarea
            </h2>
            {error && <div className="text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-xl text-sm mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    placeholder="Título de la tarea"
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-fuchsia-400/50 focus:bg-white/[0.08] transition-colors"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    placeholder="Descripción detallada..."
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-fuchsia-400/50 focus:bg-white/[0.08] transition-colors resize-none h-28"
                />
                <button
                    disabled={loading}
                    className="w-full mt-2 bg-white text-black hover:bg-gray-200 font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2 shadow-xl"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar'}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
