import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import { motion } from 'framer-motion';

function Tasks({ token }) {
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState('');

    const handleAddTask = () => {
        setRefresh(r => !r);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col lg:flex-row gap-8 mt-12 w-full max-w-7xl mx-auto px-4 z-10 relative pb-16"
        >
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <TaskForm onAddTask={handleAddTask} token={token} />
                <TaskFilter filter={filter} setFilter={setFilter} />
            </div>
            <div className="w-full lg:w-2/3">
                <TaskList token={token} refresh={refresh} filter={filter} />
            </div>
        </motion.div>
    );
}

export default Tasks;
