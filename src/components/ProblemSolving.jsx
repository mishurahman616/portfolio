import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Trophy, Target, Zap, ExternalLink, Hash } from 'lucide-react'

const ProblemSolving = () => {
    const [stats, setStats] = useState({
        leetcode: null,
        codeforces: null,
        loading: true,
        error: null
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch LeetCode stats
                const leetcodeRes = await fetch('https://leetcode-stats-api.herokuapp.com/mishurahman')
                const leetcodeData = await leetcodeRes.json()

                // Fetch Codeforces stats via a CORS proxy
                const cfUrl = encodeURIComponent('https://codeforces.com/api/user.info?handles=mishurahman')
                const cfRes = await fetch(`https://api.allorigins.win/get?url=${cfUrl}`)
                const cfWrapper = await cfRes.json()
                const cfData = JSON.parse(cfWrapper.contents)

                setStats({
                    leetcode: leetcodeData,
                    codeforces: cfData.status === 'OK' ? cfData.result[0] : null,
                    loading: false,
                    error: null
                })
            } catch (err) {
                console.error('Error fetching stats:', err)
                setStats(prev => ({ ...prev, loading: false, error: 'Failed to load stats' }))
            }
        }

        fetchStats()
    }, [])

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

    const totalSolved = (stats.leetcode?.totalSolved || 0) + (stats.codeforces ? 0 : 0)

    // Skeleton placeholder component
    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`}></div>
    )

    return (
        <div id="achievements">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center flex items-center justify-center gap-3">
                <Trophy className="text-yellow-500" />
                Problem Solving
            </h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {/* Total Stats Card */}
                <motion.div variants={item} className="bento-card md:col-span-2 lg:col-span-1 border-primary/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Target className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Milestones</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-gray-500 dark:text-gray-400">Total Solved</span>
                            {stats.loading ? (
                                <Skeleton className="h-10 w-20" />
                            ) : (
                                <span className="text-4xl font-bold text-primary">{stats.leetcode?.totalSolved || '500'}+</span>
                            )}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: stats.loading ? '10%' : '75%' }}
                                className="h-full bg-primary"
                            />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Across various platforms including LeetCode and Codeforces.
                        </p>
                    </div>
                </motion.div>

                {/* LeetCode Card */}
                <motion.div variants={item} className="bento-card group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Code2 className="text-orange-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">LeetCode</h3>
                        </div>
                        <a href="https://leetcode.com/mishurahman/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    {stats.loading ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ) : stats.leetcode ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                    <div className="text-green-500 font-bold">{stats.leetcode.easySolved}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Easy</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-yellow-500 font-bold">{stats.leetcode.mediumSolved}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Medium</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-red-500 font-bold">{stats.leetcode.hardSolved}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Hard</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                                <span className="text-sm text-gray-500">Global Rank</span>
                                <span className="font-mono text-primary">#{stats.leetcode.ranking?.toLocaleString()}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm">{stats.error || 'LeetCode stats currently unavailable.'}</div>
                    )}
                </motion.div>

                {/* Codeforces Card */}
                <motion.div variants={item} className="bento-card group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Zap className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Codeforces</h3>
                        </div>
                        <a href="https://codeforces.com/profile/mishurahman" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    {stats.loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ) : stats.codeforces ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Current Rating</span>
                                <span className={`font-bold ${stats.codeforces.rating >= 1200 ? 'text-cyan-500' : 'text-gray-500'}`}>
                                    {stats.codeforces.rating}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Max Rating</span>
                                <span className="text-primary font-bold">{stats.codeforces.maxRating}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                                <span className="text-sm text-gray-500">Rank</span>
                                <span className="capitalize text-primary font-medium">{stats.codeforces.rank}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm">{stats.error || 'Codeforces stats currently unavailable.'}</div>
                    )}
                </motion.div>

                {/* Core Topics Card */}
                <motion.div variants={item} className="bento-card md:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Hash className="text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Core Expertise</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {['Dynamic Programming', 'Graph Theory', 'Data Structures', 'Greedy Algorithms', 'String Manipulation', 'Bit Manipulation', 'Backtracking', 'Mathematics'].map((topic, i) => (
                            <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors">
                                {topic}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ProblemSolving
