import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { LayoutList, RefreshCcw } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function TaskList({ token, refresh, filter }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:3000/api/tasks', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                if (Array.isArray(data)) setTasks(data);
                else if (Array.isArray(data.tasks)) setTasks(data.tasks);
                else setTasks([]);
            } else {
                setError(data.message || 'Error al obtener tareas');
                setTasks([]);
            }
        } catch {
            setError('Error de red');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, [refresh, token]);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(filter.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.toLowerCase())
    );

    const handleUpdate = () => fetchTasks();
    const handleDelete = () => fetchTasks();

    return (
        <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3 text-white font-medium text-xl">
                    <LayoutList className="w-6 h-6 text-cyan-400" /> Sus Tareas
                </div>
                <button onClick={fetchTasks} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" title="Actualizar">
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
                {error && <div className="text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl text-sm mb-4">{error}</div>}
                
                {filteredTasks.length === 0 && !loading && !error ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-gray-500 opacity-80 mt-12 mb-12">
                        <LayoutList className="w-14 h-14 mb-4 stroke-1 hover:stroke-2 transition-all" />
                        <p className="font-light">No hay tareas que coincidan con tu búsqueda.</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    token={token}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </AnimatePresence>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TaskList;
