import React from 'react'
import { motion } from 'framer-motion'
import {
    Database,
    Server,
    Terminal,
    Cpu,
    ShieldCheck,
    Cloud,
    Code2,
    Workflow
} from 'lucide-react'

const TechStack = () => {
    const skills = [
        { title: 'Core Ecosystem', items: ['C#', '.NET 8', 'ASP.NET Core', 'EF Core'], icon: <Code2 className="text-blue-500" /> },
        { title: 'Data & Caching', items: ['SQL Server', 'MongoDB', 'Redis', 'SingleStoreDB', 'Apache Pinot'], icon: <Database className="text-yellow-500" /> },
        { title: 'Message Brokers', items: ['Kafka', 'Redis Streams'], icon: <Workflow className="text-orange-500" /> },
        { title: 'DevOps & Cloud', items: ['Docker', 'AWS', 'CI/CD Pipelines'], icon: <Cloud className="text-cyan-500" /> },
        { title: 'Observability', items: ['Application Insights', 'OpenTelemetry'], icon: <Cpu className="text-green-500" /> },
        { title: 'Testing', items: ['xUnit', 'Moq', 'NSubstitute'], icon: <ShieldCheck className="text-red-500" /> },
        { title: 'Frontend', items: ['JavaScript', 'React', 'Tailwind CSS'], icon: <Server className="text-purple-500" /> },
        { title: 'Architecture', items: ['Microservices', 'SOLID', 'Design Patterns'], icon: <Terminal className="text-gray-500" /> },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Technical Skills</h2>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {skills.map((skill, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        className="bento-card group h-full"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {skill.icon}
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider group-hover:text-primary transition-colors">
                                {skill.title}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skill.items.map((it, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 text-sm font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md border border-blue-100 dark:border-blue-800/30 shadow-sm"
                                >
                                    {it}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default TechStack
