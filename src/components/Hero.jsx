import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react'

const Hero = () => {
    return (
        <div className="flex flex-col items-center text-center py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6 inline-block">
                    Available for new opportunities
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                    Building Scalable <br />
                    <span className="text-blue-600 dark:text-blue-400">Systems using .NET</span>
                </h1>
                <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400 mb-10 mx-auto">
                    Software Engineer specializing in backend architecture, high-performance systems, and modernizing legacy applications.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="#projects"
                        className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105"
                    >
                        View Projects <ArrowRight size={20} />
                    </a>
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/mishurahman616"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Github size={24} className="text-gray-700 dark:text-gray-300" />
                        </a>
                        <a
                            href="https://linkedin.com/in/mishurahman64"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Linkedin size={24} className="text-gray-700 dark:text-gray-300" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Hero
