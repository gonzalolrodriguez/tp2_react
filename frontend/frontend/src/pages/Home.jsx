import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

function Home({ setPage, user }) {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] w-full overflow-hidden px-4">

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Magenta/Purple */}
                <motion.div
                    animate={{
                        x: [0, 150, -50, 0],
                        y: [0, 100, -100, 0],
                        scale: [1, 1.5, 1.2, 1],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] left-[10%] w-[50vh] h-[50vh] bg-fuchsia-600/40 blur-[120px] rounded-full mix-blend-screen"
                />

                {/* Deep Blue */}
                <motion.div
                    animate={{
                        x: [0, -200, 100, 0],
                        y: [0, -50, 150, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[30%] left-[40%] w-[60vh] h-[60vh] bg-blue-600/40 blur-[130px] rounded-full mix-blend-screen"
                />

                {/* Cyan */}
                <motion.div
                    animate={{
                        x: [0, 100, -150, 0],
                        y: [0, -150, 50, 0],
                        scale: [1, 1.4, 0.9, 1],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[20%] right-[30%] w-[45vh] h-[45vh] bg-cyan-400/30 blur-[100px] rounded-full mix-blend-screen"
                />

                {/* Orange/Red */}
                <motion.div
                    animate={{
                        x: [0, -100, 100, 0],
                        y: [0, 100, -100, 0],
                        scale: [1.2, 1, 1.5, 1.2],
                    }}
                    transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[10%] right-[5%] w-[55vh] h-[55vh] bg-orange-600/40 blur-[140px] rounded-full mix-blend-screen"
                />
            </div>

            {/* Main Glassmorphism Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center mt-8 mb-12 w-full z-10 max-w-5xl bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-2xl rounded-[2.5rem] p-8 sm:p-14"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8 backdrop-blur-md"
                >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-gray-200 tracking-wide">To Do</span>
                </motion.div>

                <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-medium tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
                    Bienvenido.<br className="hidden sm:block" />
                    <span className="text-gray-300 block mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-light">
                        Anotá todo lo que estes pensando
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light leading-relaxed">
                    Organiza tus prioridades dentro de un ecosistema diseñado para armonizar
                </p>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col sm:flex-row gap-4 mb-20 relative z-20"
                >
                    {!user ? (
                        <button
                            onClick={() => setPage('auth')}
                            className="group bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-3 transition-colors shadow-xl"
                        >
                            Comenzar
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setPage('tasks')}
                            className="group bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-3 transition-colors shadow-xl"
                        >
                            Explorar mi tablero
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl text-left relative z-20">
                    {[
                        { icon: CheckCircle, title: "Claridad", desc: "La esencia del diseño al servicio de tus tareas.", color: "text-white" },
                        { icon: Zap, title: "Fluidez", desc: "Motor potente reactivo asegurando interactividad impecable.", color: "text-white" },
                        { icon: Shield, title: "Integridad", desc: "Datos fortificados tras escudos criptográficos reales.", color: "text-white" }
                    ].map((feature, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            key={i}
                            className="flex flex-col bg-white/[0.03] backdrop-blur-2xl p-6 rounded-3xl shadow-lg border border-white/10 hover:bg-white/[0.06] transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-white/10 border border-white/5 transition-transform group-hover:scale-110">
                                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                            </div>
                            <h3 className="font-medium text-lg mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Home;
