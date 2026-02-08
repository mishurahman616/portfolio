import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Layers, Database, Cpu } from 'lucide-react'

const Projects = () => {
    const projects = [
        {
            title: 'Enterprise Resource Planning (ERP)',
            description: 'Migrated a legacy ERP from .NET Framework 4.8 to .NET 8. Developed features for Administration, Finance, and Inventory following SOLID and Design Patterns.',
            tech: ['C#', '.NET Framework', '.NET8', 'SQL Server', 'Kafka', 'Redis', 'SingleStoreDB'],
            impact: 'Improved performance and maintainability through Outbox Pattern and event-driven messaging.'
        },
        {
            title: 'Student Portal System',
            description: 'Built a scalable student portal backend. Implemented Redis caching and SingleStoreDB for real-time analytics.',
            tech: ['C#', '.NET8', 'Kafka', 'Redis', 'MongoDB', 'Apache Pinot'],
            impact: 'Optimized database queries and ensured reliable messaging with Outbox Pattern.'
        },
        {
            title: 'Inventory Management System',
            description: 'Web-based system with role-based access, stock tracking, and product categorization.',
            tech: ['C#', '.NET', 'NHibernate', 'SQL Server', 'Razor', 'Bootstrap'],
            impact: 'Applied layered systems and unit testing for maximum stability.'
        },
        {
            title: 'Online CV Builder',
            description: 'Clean systems based tool for creating and sharing professional resumes with PDF export.',
            tech: ['C#', '.NET', 'SQL Server', 'SOLID Patterns'],
            link: 'https://github.com/mishurahman616/CVBuilder'
        }
    ]

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Key Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bento-card flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <Github size={20} />
                                </a>
                            )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                            {project.description}
                        </p>
                        {project.impact && (
                            <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded">
                                <p className="text-sm text-blue-800 dark:text-blue-300 italic">{project.impact}</p>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map((t, i) => (
                                <span key={i} className="text-xs font-mono px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 rounded-md">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Projects
