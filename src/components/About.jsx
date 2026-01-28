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
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square max-w-xs mx-auto"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-500/30 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
                    {/* Tech Pattern Background */}
                    <div className="absolute inset-0 opacity-20 dark:opacity-20">
                        <div className="absolute top-4 left-4 text-blue-600 dark:text-blue-400 font-mono text-xs">
                            using System;<br />
                            namespace Portfolio
                        </div>
                        <div className="absolute bottom-4 right-4 text-white dark:text-white font-mono text-xs text-right">
                            Software Engineer
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-blue-500/20 dark:text-blue-400/10">
                            &#123;&#125;
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="relative h-full w-full flex items-center justify-center p-6">
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-gray-800/50">
                            <img
                                src="/portfolio/profile.jpg"
                                alt="Mishu Rahman - Software Engineer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default About
