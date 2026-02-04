
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Book, Clock } from 'lucide-react';
import { useUser } from '@/lib/userContext';
import { memoryService, Memory } from '@/lib/memoryService';

const SweetMemories = () => {
    const navigate = useNavigate();
    const { currentUser, switchUser } = useUser();
    const [memories, setMemories] = useState<Memory[]>([]);
    const [filter, setFilter] = useState<'All' | 'Yadish' | 'Rini'>('All');

    useEffect(() => {
        // Load memories
        const allMemories = memoryService.getAllMemories();
        if (filter === 'All') {
            setMemories(allMemories);
        } else {
            setMemories(allMemories.filter(m => m.author === filter));
        }
    }, [filter]);

    const handleCreateNew = () => {
        const newMemory = memoryService.createMemory('Untitled Memory', currentUser);
        navigate(`/memories/${newMemory.id}`);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white p-4 md:p-8">
            {/* Header / Nav */}
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-12 pt-4">
                <button
                    onClick={() => navigate('/enter-world')}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm text-white/70"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                    {(['Rini', 'Yadish'] as const).map((user) => (
                        <button
                            key={user}
                            onClick={() => switchUser(user)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${currentUser === user ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'
                                }`}
                        >
                            {user}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                            Sweet Memories
                        </h1>
                        <p className="text-white/40">
                            Stories written by {currentUser === 'Yadish' ? 'Yadi' : 'Rini'} & {currentUser === 'Yadish' ? 'Rini' : 'Yadi'}.
                        </p>
                    </div>

                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg shadow-indigo-900/20"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Write New Memory</span>
                    </button>
                </header>

                {/* Filters */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {(['All', 'Rini', 'Yadish'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`whitespace-nowrap pb-2 border-b-2 text-sm font-medium transition-colors ${filter === f ? 'border-white text-white' : 'border-transparent text-white/30 hover:text-white/60'
                                }`}
                        >
                            {f === 'All' ? 'All Memories' : `By ${f}`}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {memories.length > 0 ? (
                        memories.map((memory) => (
                            <div
                                key={memory.id}
                                onClick={() => navigate(`/memories/${memory.id}`)}
                                className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer flex items-start gap-4"
                            >
                                <div className={`mt-1 p-3 rounded-xl ${memory.author === 'Rini' ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                    <Book className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-medium text-white group-hover:text-indigo-200 transition-colors truncate pr-4">
                                            {memory.title || "Untitled Memory"}
                                        </h3>
                                        <span className="text-xs text-white/30 whitespace-nowrap flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(memory.updatedAt)}
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-sm line-clamp-2">
                                        {memory.content ? memory.content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '') : "No content yet..."}
                                    </p>
                                    <div className="mt-4 flex items-center gap-3 text-xs">
                                        <span className={`px-2 py-0.5 rounded-md bg-white/5 border border-white/5 ${memory.author === 'Rini' ? 'text-rose-400' : 'text-blue-400'}`}>
                                            By {memory.author}
                                        </span>
                                        {memory.versions.length > 0 && (
                                            <span className="text-white/20">
                                                {memory.versions.length} versions
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-white/30">No memories found. Start writing one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SweetMemories;
