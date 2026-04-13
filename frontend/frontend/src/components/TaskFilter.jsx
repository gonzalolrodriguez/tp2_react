import React from 'react';
import { Search } from 'lucide-react';

function TaskFilter({ filter, setFilter }) {
    return (
        <div className="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-2xl rounded-3xl p-6">
            <h3 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">Filtrar Tareas</h3>
            <div className="relative">
                <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Buscar por título o desc..."
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-colors"
                />
            </div>
        </div>
    );
}

export default TaskFilter;
