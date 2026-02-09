import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Terminal, Code2, Cpu, Coffee } from 'lucide-react'

const Hero = () => {
    const roles = [
        "Software Engineer",
        ".NET Specialist",
        "Excellent Debugger",
        "Always Learning"
    ];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3500); // Slightly slower for better readability
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { label: "Engineering", value: "2+ Years", icon: Cpu },
        { label: "Systems Built", value: "10+", icon: Code2 },
        { label: "Impact", value: "Scalable", icon: Coffee },
    ];

    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-20 overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-20" />
            <div className="scanline" />

            {/* Animated Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                {/* Availability Pill */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono mb-8"
                >
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    SYSTEM_READY: Available for Opportunities
                </motion.div>

                {/* Name as Code */}
                <div className="mb-6">
                    <span className="font-mono text-gray-500 text-lg md:text-xl">const </span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 text-lg md:text-xl">SoftwareEngineer</span>
                    <span className="font-mono text-gray-500 text-lg md:text-xl"> = </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight text-gray-900 dark:text-white mt-2">
                        "Mishu Rahman"
                    </h1>
                </div>

                {/* Animated Role Terminal */}
                <div className="flex items-center justify-center gap-3 mb-8 h-12">
                    <Terminal size={24} className="text-primary hidden md:block" />
                    <div className="text-xl md:text-3xl font-mono text-gray-600 dark:text-gray-400">
                        <span className="text-primary">&gt; </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roles[roleIndex]}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="inline-block"
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-3 h-6 md:w-4 md:h-8 bg-primary ml-1 translate-y-1"
                        />
                    </div>
                </div>

                <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 mx-auto leading-relaxed">
                    Engineering resilient backend ecosystems with <span className="text-blue-600 dark:text-blue-400 font-semibold">.NET & C#</span>.
                    Specializing in high-throughput distributed systems, modular system modernization, and performance optimization at scale.
                </p>

                {/* Quick Stats Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm flex flex-col items-center gap-2 group"
                        >
                            <stat.icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Actions & Code-themed Socials */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="#projects"
                        className="group flex items-center gap-2 px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                    >
                        view_projects() <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/mishurahman616"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-1"
                        >
                            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                                <Github size={24} className="text-gray-700 dark:text-white" />
                            </div>
                            <span className="text-[10px] items-center font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                                // github
                            </span>
                        </a>
                        <a
                            href="https://linkedin.com/in/mishurahman64"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-1"
                        >
                            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                                <Linkedin size={24} className="text-gray-700 dark:text-white" />
                            </div>
                            <span className="text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                                // linkedin
                            </span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Hero
