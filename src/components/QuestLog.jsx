import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Swords,
    Flame,
    CheckCircle2,
    Timer,
    ShieldAlert,
    ChevronRight,
    Trophy,
    X,
    Calendar,
    ArrowRight,
    ExternalLink,
    RefreshCw
} from 'lucide-react'

const QuestLog = () => {
    const [quests, setQuests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeModal, setActiveModal] = useState(null)
    const [selectedQuest, setSelectedQuest] = useState(null)

    const fetchWithTimeout = async (resource, options = {}) => {
        const { timeout = 8000 } = options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(resource, { ...options, signal: controller.signal });
            clearTimeout(id);
            return response;
        } catch (e) {
            clearTimeout(id);
            throw e;
        }
    };

    const fetchQuests = async () => {
        setLoading(true);
        setError(null);
        console.log('QuestLog: Starting fetch sequence...');

        try {
            // 1. Local Challenges - Multi-path strategy
            let localChallenges = [];
            const pathsToTry = [
                `${import.meta.env.BASE_URL || '/'}data/challenges.json`,
                '/portfolio/data/challenges.json',
                '/data/challenges.json',
                'data/challenges.json'
            ];

            for (const path of pathsToTry) {
                try {
                    console.log('QuestLog: Trying local path:', path);
                    const res = await fetchWithTimeout(`${path}?t=${new Date().getTime()}`, { timeout: 3000 });
                    if (res.ok) {
                        const data = await res.json();
                        localChallenges = (data.challenges || []).map(c => ({
                            ...c,
                            id: c.id ? `local-${c.id}` : `local-${Math.random().toString(36).substr(2, 9)}`
                        }));
                        console.log('QuestLog: Success! Local loaded from:', path, 'Count:', localChallenges.length);
                        break;
                    }
                } catch (e) {
                    console.warn(`QuestLog: Path ${path} failed or timed out`);
                }
            }

            // 2. LeetCode Badges - Multi-proxy strategy
            let badgeQuests = []
            const lcGraphqlUrl = `https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%20%22mishurahman%22)%20{badges%20{%20id%20name%20shortName%20displayName%20icon%20hoverText%20creationDate%20}%20}}`

            try {
                console.log('QuestLog: Attempting badges via primary proxy...');
                const res = await fetchWithTimeout(`https://corsproxy.io/?${encodeURIComponent(lcGraphqlUrl)}`, { timeout: 5000 });
                if (res.ok) {
                    const lcData = await res.json();
                    if (lcData?.data?.matchedUser?.badges) {
                        badgeQuests = lcData.data.matchedUser.badges.map(b => {
                            const displayName = b.displayName || b.name || "";
                            const isHighValue = displayName.includes("100 Days") || displayName.includes("50 Days");
                            return {
                                id: `badge-${b.id || b.name}`,
                                title: displayName,
                                description: b.hoverText || "Achievement earned on LeetCode.",
                                details: "Official badge awarded by LeetCode.",
                                status: "completed",
                                type: "LeetCode Achievement",
                                color: isHighValue ? "purple" : "orange",
                                completionDate: b.creationDate || "Recent",
                                iconUrl: b.icon ? (b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`) : null
                            };
                        });
                        console.log('QuestLog: Badges loaded via primary proxy');
                    }
                } else {
                    throw new Error('primary proxy fail');
                }
            } catch (e) {
                console.warn('QuestLog: Primary proxy failed, trying fallback...');
                try {
                    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(lcGraphqlUrl)}`;
                    const res = await fetchWithTimeout(proxyUrl, { timeout: 5000 });
                    if (res.ok) {
                        const wrapper = await res.json();
                        const lcData = typeof wrapper.contents === 'string' ? JSON.parse(wrapper.contents) : wrapper.contents;
                        if (lcData?.data?.matchedUser?.badges) {
                            badgeQuests = lcData.data.matchedUser.badges.map(b => {
                                const displayName = b.displayName || b.name || "";
                                const isHighValue = displayName.includes("100 Days") || displayName.includes("50 Days");
                                return {
                                    id: `badge-${b.id || b.name}`,
                                    title: displayName,
                                    description: b.hoverText || "Achievement earned on LeetCode.",
                                    details: "Official badge awarded by LeetCode.",
                                    status: "completed",
                                    type: "LeetCode Achievement",
                                    color: isHighValue ? "purple" : "orange",
                                    completionDate: b.creationDate || "Recent",
                                    iconUrl: b.icon ? (b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`) : null
                                };
                            });
                            console.log('QuestLog: Badges loaded via fallback proxy');
                        }
                    }
                } catch (e2) {
                    console.error('QuestLog: All badge proxies failed');
                }
            }

            const merged = [...localChallenges, ...badgeQuests];
            console.log('QuestLog: Final merged count:', merged.length);
            setQuests(merged);
            setLoading(false);
        } catch (err) {
            console.error('QuestLog: Critical fetch error:', err);
            setError('Failed to sync with the Quest Log.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuests();
    }, [])

    const categorizedQuests = {
        running: quests.filter(q => q.status === 'running'),
        upcoming: quests.filter(q => q.status === 'upcoming'),
        completed: quests.filter(q => q.status === 'completed').sort((a, b) => {
            const getPriority = (quest) => {
                const title = quest.title || "";
                if (title.includes("Annual Badge")) return 2;
                if (title.includes("Daily Coding Challenge")) return 1;
                return 0;
            };

            const priorityA = getPriority(a);
            const priorityB = getPriority(b);

            if (priorityA !== priorityB) {
                return priorityB - priorityA; // Higher priority first
            }

            const dateA = String(a.completionDate || '')
            const dateB = String(b.completionDate || '')
            return dateB.localeCompare(dateA) // Latest date within same priority
        })
    }

    const Skeleton = () => (
        <div className="bento-card animate-pulse h-48">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-6"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
        </div>
    )

    const QuestCard = ({ quest, isInsideModal = false }) => {
        const isRunning = quest.status === 'running'
        const isUpcoming = quest.status === 'upcoming'
        const isCompleted = quest.status === 'completed'

        return (
            <motion.div
                layoutId={isInsideModal ? undefined : `quest-${quest.id}`}
                onClick={() => setSelectedQuest(quest)}
                className={`bento-card relative group cursor-pointer overflow-hidden transition-all duration-300 ${isRunning ? 'border-primary/30 bg-primary/5 hover:border-primary/50' : 'hover:border-gray-400/30'} flex flex-col h-full ${isInsideModal ? 'min-h-[240px] p-8' : 'min-h-[200px]'}`}
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

                    <span className={`flex items-center gap-1 text-[10px] uppercase font-bold ${isRunning ? 'text-primary animate-pulse' :
                        isUpcoming ? 'text-orange-500' :
                            'text-green-500'
                        }`}>
                        {isRunning && <><Timer size={12} /> Active</>}
                        {isUpcoming && <><Calendar size={12} /> Scheduled</>}
                        {isCompleted && <><CheckCircle2 size={12} /> Completed</>}
                    </span>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {quest.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 italic">
                    "{quest.description}"
                </p>

                <div className="mt-auto">
                    {isRunning && (
                        <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(quest.currentDay / quest.totalDays) * 100}%` }}
                                className="h-full bg-primary"
                            />
                        </div>
                    )}
                    {isUpcoming && (
                        <div className="text-[10px] font-mono text-orange-500/70">
                            TARGET: {quest.scheduledDate || "TBA"}
                        </div>
                    )}
                    {isCompleted && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5 mt-auto">
                            <div className="flex items-center gap-1.5 text-green-500">
                                <Trophy size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">
                                {quest.completionDate}
                            </span>
                        </div>
                    )}
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1 rounded-full bg-primary/10 text-primary">
                        <ArrowRight size={14} />
                    </div>
                </div>
            </motion.div>
        )
    }

    const QuestRow = ({ title, type, items, icon: Icon }) => {
        if (!items.length && !loading) return null;

        return (
            <div className="mb-16 last:mb-0">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${type === 'running' ? 'bg-primary/10 text-primary' : type === 'upcoming' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                            <Icon size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-xs text-gray-500 font-mono">
                            {loading ? '...' : items.length}
                        </span>
                    </div>
                    {items.length > 3 && (
                        <button
                            onClick={() => setActiveModal(type)}
                            className="group flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all"
                        >
                            See All <ChevronRight size={16} />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [1, 2, 3].map(i => <Skeleton key={i} />)
                    ) : (
                        items.slice(0, 3).map(q => <QuestCard key={q.id} quest={q} />)
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16 text-center flex items-center justify-center gap-3">
                <Swords className="text-primary" />
                The Milestone Tracker
            </h2>

            {error && (
                <div className="max-w-md mx-auto text-center mb-12 p-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
                    <ShieldAlert className="mx-auto text-red-500 mb-3" size={32} />
                    <p className="text-red-500 font-bold mb-4">{error}</p>
                    <button
                        onClick={fetchQuests}
                        className="flex items-center gap-2 mx-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <RefreshCw size={16} /> Retry Sync
                    </button>
                </div>
            )}

            {!loading && quests.length === 0 && !error && (
                <div className="text-center py-20 bg-gray-100 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
                    <p className="text-gray-500 dark:text-gray-400 italic">"No quests recorded in this realm yet..."</p>
                </div>
            )}

            <QuestRow title="Current Raids" type="running" items={categorizedQuests.running} icon={Flame} />
            <QuestRow title="Upcoming Quests" type="upcoming" items={categorizedQuests.upcoming} icon={Calendar} />
            <QuestRow title="Completed Quests" type="completed" items={categorizedQuests.completed} icon={Trophy} />

            {/* Modals */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gray-50 dark:bg-[#0a0a0a] w-full max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white">
                                <h3 className="text-xl font-bold capitalize">
                                    {activeModal} Quests
                                </h3>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-8 md:p-12 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categorizedQuests[activeModal].map(q => (
                                    <QuestCard key={q.id} quest={q} isInsideModal={true} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {selectedQuest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedQuest(null)}
                    >
                        <motion.div
                            layoutId={`quest-${selectedQuest.id}`}
                            className="bg-white dark:bg-[#121212] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-gray-900 dark:text-white"
                            onClick={e => e.stopPropagation()}
                        >
                            {selectedQuest.imageUrl && (
                                <div className="w-full h-48 md:h-64 overflow-hidden relative">
                                    <img
                                        src={selectedQuest.imageUrl}
                                        alt={selectedQuest.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            )}

                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-2xl bg-primary/10 text-primary`}>
                                            {selectedQuest.iconUrl ? (
                                                <img src={selectedQuest.iconUrl} alt="" className="w-8 h-8 object-contain" />
                                            ) : (
                                                <Swords size={24} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">{selectedQuest.title}</h3>
                                            <span className="text-xs text-gray-500 uppercase tracking-widest">{selectedQuest.type}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedQuest(null)}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-6">
                                        "{selectedQuest.description}"
                                    </p>
                                    <div className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                                        {selectedQuest.details || "No further details available for this quest."}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100 dark:border-white/10">
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Status</span>
                                        <span className={`text-sm font-bold flex items-center gap-1 ${selectedQuest.status === 'completed' ? 'text-green-500' : 'text-primary'}`}>
                                            {selectedQuest.status === 'completed' ? <CheckCircle2 size={14} /> : <Timer size={14} />}
                                            {selectedQuest.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">
                                            {selectedQuest.status === 'completed' ? 'Completed On' : selectedQuest.status === 'upcoming' ? 'Scheduled For' : 'Progress'}
                                        </span>
                                        <span className="text-sm font-mono font-bold">
                                            {selectedQuest.completionDate || selectedQuest.scheduledDate || `${selectedQuest.currentDay}/${selectedQuest.totalDays} Days`}
                                        </span>
                                    </div>
                                </div>

                                {selectedQuest.type === 'LeetCode Achievement' && (
                                    <a
                                        href="https://leetcode.com/mishurahman/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all mt-4"
                                    >
                                        Verify Achievement <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default QuestLog
