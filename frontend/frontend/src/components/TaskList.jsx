import React, { useEffect, useCallback, useMemo } from 'react';
import TaskItem from './TaskItem';
import { LayoutList, RefreshCcw } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useGlobalContext, actions } from '../context/globalContextUtils';


function TaskList({ token, refresh, filter }) {
    const { state, dispatch } = useGlobalContext();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    // Fetch tasks from API and set in global state
    const fetchTasks = React.useCallback(async (signal) => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:3000/api/tasks', {
                headers: { 'Authorization': `Bearer ${token}` },
                signal
            });
            const data = await res.json();
            if (res.ok) {
                let tasksArr = Array.isArray(data) ? data : (Array.isArray(data.tasks) ? data.tasks : []);
                dispatch({ type: actions.ADD_ITEM, payload: null });
                dispatch({ type: 'SET_ALL', payload: tasksArr });
            } else {
                setError(data.message || 'Error al obtener tareas');
            }
        } catch (err) {
            if (err.name !== 'AbortError') setError('Error de red');
        }
        setLoading(false);
    }, [token, dispatch]);


    useEffect(() => {
        const controller = new AbortController();
        fetchTasks(controller.signal);
        return () => controller.abort();
    }, [fetchTasks, refresh]);

    // Filter tasks from global state
    const filteredTasks = useMemo(() =>
        (state.items || []).filter(task =>
            task.title.toLowerCase().includes(filter.toLowerCase()) ||
            task.description.toLowerCase().includes(filter.toLowerCase())
        ),
        [state.items, filter]
    );

    const handleUpdate = useCallback(() => fetchTasks(), [fetchTasks]);
    const handleDelete = useCallback(() => fetchTasks(), [fetchTasks]);

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
