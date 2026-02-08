import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Swords,
    Flame,
    CheckCircle2,
    Timer,
    ShieldAlert,
    ChevronRight,
    Trophy
} from 'lucide-react'

const QuestLog = () => {
    const [quests, setQuests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                // Fetching manual challenges from public directory
                // Using BASE_URL to work correctly in both development and production
                const baseUrl = import.meta.env.BASE_URL || '/'
                const localResponse = await fetch(`${baseUrl}data/challenges.json?t=${new Date().getTime()}`)
                const localData = localResponse.ok ? await localResponse.json() : { challenges: [] }

                // Fetching LeetCode badges from the official GraphQL endpoint
                let badgeQuests = []
                try {
                    const lcGraphqlUrl = `https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%20%22mishurahman%22)%20{badges%20{%20id%20name%20shortName%20displayName%20icon%20hoverText%20creationDate%20}%20}}`
                    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(lcGraphqlUrl)}`
                    const lcRes = await fetch(proxyUrl)
                    const lcWrapper = await lcRes.json()
                    const lcData = JSON.parse(lcWrapper.contents)

                    if (lcData.data && lcData.data.matchedUser && lcData.data.matchedUser.badges) {
                        badgeQuests = lcData.data.matchedUser.badges.map(b => ({
                            id: `badge-${b.id}`,
                            title: b.displayName,
                            description: b.hoverText || "Achievement earned on LeetCode.",
                            status: "completed",
                            currentDay: 1,
                            totalDays: 1,
                            type: "LeetCode Achievement",
                            color: "orange",
                            completionDate: b.creationDate,
                            iconUrl: b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`
                        }))
                    }
                } catch (badgeErr) {
                    console.warn('LeetCode badges fetch failed, but continuing with local data.', badgeErr)
                }

                // Merge and sort: Running quests first, then completed ones
                const allQuests = [...(localData.challenges || []), ...badgeQuests].sort((a, b) => {
                    if (a.status === 'running' && b.status !== 'running') return -1
                    if (a.status !== 'running' && b.status === 'running') return 1
                    return 0
                })

                setQuests(allQuests)
                setLoading(false)
            } catch (err) {
                console.error('Quest Log sync error:', err)
                setError('Could not sync with the Quest Log.')
                setLoading(false)
            }
        }

        fetchQuests()
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

    const Skeleton = () => (
        <div className="bento-card animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-6"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
        </div>
    )

    return (
        <div id="quests">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center flex items-center justify-center gap-3">
                <Swords className="text-primary" />
                The Quest Log
            </h2>

            {error && (
                <div className="text-center text-red-500 mb-8 flex items-center justify-center gap-2">
                    <ShieldAlert size={18} />
                    {error}
                </div>
            )}

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {loading ? (
                    [1, 2, 3].map(i => <Skeleton key={i} />)
                ) : (
                    quests.map((quest) => (
                        <motion.div
                            key={quest.id}
                            variants={item}
                            className={`bento-card relative group overflow-hidden ${quest.status === 'running'
                                ? 'border-primary/30 bg-primary/5'
                                : 'opacity-80'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-lg border ${quest.color === 'blue' ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' :
                                    quest.color === 'green' ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                                        quest.color === 'orange' ? 'text-orange-500 border-orange-500/20 bg-orange-500/10' :
                                            'text-purple-500 border-purple-500/20 bg-purple-500/10'
                                    }`}>
                                    {quest.iconUrl ? (
                                        <img src={quest.iconUrl} alt={quest.title} className="w-6 h-6 object-contain" />
                                    ) : (
                                        <span className="text-[10px] font-mono px-1">{quest.type}</span>
                                    )}
                                </div>

                                {quest.status === 'running' ? (
                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary animate-pulse">
                                        <Timer size={12} /> Active
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-500">
                                        <CheckCircle2 size={12} /> Conquered
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                {quest.title}
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 italic">
                                "{quest.description}"
                            </p>

                            <div className="space-y-4">
                                {quest.status === 'running' ? (
                                    <>
                                        <div className="flex justify-between items-end text-sm">
                                            <span className="text-gray-500">Progress</span>
                                            <span className="font-bold text-gray-900 dark:text-white">
                                                {quest.currentDay}/{quest.totalDays} Days
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(quest.currentDay / quest.totalDays) * 100}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 text-orange-500">
                                            <Flame size={16} fill="currentColor" />
                                            <span className="text-xs font-bold font-mono">
                                                {quest.streak} DAY STREAK
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-2 text-green-500">
                                            <Trophy size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                Conquered
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-mono">
                                            {quest.completionDate}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">
                                View Details <ChevronRight size={12} />
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    )
}

export default QuestLog
