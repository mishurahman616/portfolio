import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const Education = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Education</h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bento-card max-w-2xl"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <GraduationCap className="text-blue-600 dark:text-blue-400" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bachelor of Computer Science and Engineering</h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300">City University, Bangladesh</p>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">CGPA: 3.42</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">2018 – 2022</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Education
