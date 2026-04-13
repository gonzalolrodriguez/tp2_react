import React, { useState } from 'react';
import { Pen, Trash2, X, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function TaskItem({ task, token, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description })
            });
            if (res.ok) {
                onUpdate();
                setIsEditing(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Eliminar esta tarea?')) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                onDelete();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.li 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white/[0.04] border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-white/10 transition-all gap-4 shadow-sm"
        >
            {isEditing ? (
                <div className="flex-1 w-full flex flex-col gap-3">
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.05] focus:border-cyan-400/50 focus:bg-white/[0.1] outline-none text-sm font-medium text-white placeholder-gray-400 transition-colors"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        disabled={loading}
                        placeholder="Título"
                    />
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.05] focus:border-cyan-400/50 focus:bg-white/[0.1] outline-none text-sm text-gray-300 placeholder-gray-400 transition-colors"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        disabled={loading}
                        placeholder="Descripción"
                    />
                </div>
            ) : (
                <div className="flex-1 w-full pr-4">
                    <h4 className="font-medium text-white text-lg tracking-wide">{task.title}</h4>
                    <p className="text-gray-400 text-sm mt-1.5 leading-relaxed font-light">{task.description}</p>
                </div>
            )}

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {isEditing ? (
                    <>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            disabled={loading} 
                            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                            title="Cancelar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={handleEdit} 
                            disabled={loading} 
                            className="p-2.5 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors"
                            title="Guardar"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => setIsEditing(true)} 
                            disabled={loading} 
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                            title="Editar"
                        >
                            <Pen className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={handleDelete} 
                            disabled={loading} 
                            className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/30"
                            title="Eliminar"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                    </>
                )}
            </div>
        </motion.li>
    );
}

export default TaskItem;
