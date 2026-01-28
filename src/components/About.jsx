import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    <p>
                        I am a Software Engineer based in Dhaka, Bangladesh, with a strong focus on C# and .NET technologies.
                        I am passionate about building scalable, maintainable, and high-performance applications.
                    </p>
                    <p>
                        Specialized in modernizing legacy ASP.NET projects to .NET Core, I enjoy the challenge of
                        optimizing performance and improving architectural patterns using SOLID principles and Design Patterns.
                    </p>
                    <p>
                        My experience spans from working with traditional SQL databases like SQL Server to modern
                        high-performance data stores like Redis, SingleStoreDB, and ClickHouse.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square max-w-md mx-auto"
            >
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/20 dark:border-gray-800 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    {/* Placeholder for User Image */}
                    <div className="text-center p-8">
                        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                            <span className="text-3xl font-bold text-white">MR</span>
                        </div>
                        <p className="font-mono text-sm text-gray-500">System.Runtime.Profile</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default About
