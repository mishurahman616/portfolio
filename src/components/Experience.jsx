import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const Experience = () => {
    const experiences = [
        {
            company: 'OnnoRokom Projukti Ltd.',
            role: 'Assistant Software Engineer',
            period: '03/2024 – Present',
            description: [
                'Modernizing legacy .NET Framework applications to .NET 8, improving performance and maintainability.',
                'Designed applications using OOP, SOLID principles, and patterns like Repository, Factory, Strategy.',
                'Optimized performance using Redis, MongoDB, SingleStoreDB, and Apache Pinot.',
                'Participated in Agile/Scrum environment and wrote unit tests using xUnit and Moq.'
            ]
        },
        {
            company: 'DevSkill',
            role: 'Software Engineer Intern',
            period: '12/2023 – 02/2024',
            description: [
                'Produced clean, efficient code based on specifications.',
                'Tested and deployed programs and systems.',
                'Identified and fixed bugs in existing software.'
            ]
        }
    ]

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Experience</h2>
            <div className="space-y-12">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative pl-8 border-l-2 border-blue-500/30 dark:border-blue-500/20"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-[#0a0a0a]"></div>
                        <div className="flex flex-wrap justify-between items-baseline mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                {exp.period}
                            </span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <Briefcase size={18} className="text-gray-400" /> {exp.company}
                        </h4>
                        <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                                <li key={i} className="text-gray-600 dark:text-gray-400 flex gap-2">
                                    <span className="text-blue-500 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Experience
