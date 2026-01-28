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
        { title: 'Languages', items: ['C#', 'JavaScript', 'SQL'], icon: <Code2 className="text-blue-500" /> },
        { title: 'Frameworks', items: ['ASP.NET Core', 'EF Core', 'React', 'JQuery'], icon: <Server className="text-purple-500" /> },
        { title: 'Databases', items: ['SQL Server', 'MongoDB', 'Redis', 'ClickHouse'], icon: <Database className="text-yellow-500" /> },
        { title: 'Infras/DevOps', items: ['Docker', 'AWS (EC2, S3, SQS)', 'CI/CD'], icon: <Cloud className="text-cyan-500" /> },
        { title: 'Messaging', items: ['Kafka', 'Redis Streams'], icon: <Workflow className="text-orange-500" /> },
        { title: 'Monitoring', items: ['Application Insights', 'OpenTelemetry'], icon: <Cpu className="text-green-500" /> },
        { title: 'Testing', items: ['xUnit', 'Moq', 'NSubstitute'], icon: <ShieldCheck className="text-red-500" /> },
        { title: 'Other', items: ['Git', 'Agile/Scrum', 'Design Patterns'], icon: <Terminal className="text-gray-500" /> },
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
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                {skill.title}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skill.items.map((it, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700"
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
