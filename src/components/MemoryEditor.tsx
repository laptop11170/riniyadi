
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, History, Download, MessageSquare, Send } from 'lucide-react';
// import {
//     MDXEditor,
//     headingsPlugin,
//     listsPlugin,
//     quotePlugin,
//     thematicBreakPlugin,
//     markdownShortcutPlugin,
//     toolbarPlugin,
//     UndoRedo,
//     BoldItalicUnderlineToggles,
//     BlockTypeSelect,
//     MDXEditorMethods
// } from '@mdxeditor/editor';
// import '@mdxeditor/editor/style.css';
import { useUser } from '@/lib/userContext';
import { memoryService, Memory, Comment } from '@/lib/memoryService';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// Fallback for missing deps
const saveAs = (blob: Blob, name: string) => { console.log('Saving', name); alert('Save not implemented fully yet due to missing deps'); };
const html2canvas = {} as any;
const jsPDF = class { constructor() { } text() { } setFontSize() { } splitTextToSize() { } save() { } } as any;

// Custom Toolbar Components mimicking the requested UI
const ToolbarButton = ({ icon: Icon, onClick, active = false, title, disabled }: any) => (
    <button
        onClick={(e) => {
            e.preventDefault(); // Prevent losing focus
            onClick(e);
        }}
        disabled={disabled}
        title={title}
        className={`p-2 rounded transition-colors ${disabled
            ? 'opacity-30 cursor-not-allowed text-white/50'
            : active
                ? 'bg-white/20 text-indigo-300'
                : 'hover:bg-white/10 text-white/70'
            }`}
    >
        <Icon className="w-4 h-4" />
    </button>
);

import { Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, Quote, Minus, Users } from 'lucide-react';

const MDXEditor = React.forwardRef<any, any>(({ markdown, onChange, className, readOnly }, ref) => {
    // We treat 'markdown' prop as HTML content for this WYSIWYG editor
    const [val, setVal] = React.useState(markdown || '');
    const editorRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Only update if content is significantly different to avoid cursor jumping
        if (editorRef.current && editorRef.current.innerHTML !== markdown) {
            editorRef.current.innerHTML = markdown || '';
            setVal(markdown || '');
        }
    }, [markdown]);

    React.useImperativeHandle(ref, () => ({
        getMarkdown: () => val, // now returns HTML
        setMarkdown: (v: string) => {
            setVal(v);
            if (editorRef.current) editorRef.current.innerHTML = v;
        }
    }));

    const execCmd = (command: string, value: string | undefined = undefined) => {
        if (readOnly) return;
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
            handleChange();
        }
    };

    const handleChange = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            setVal(html);
            if (onChange) onChange(html);
        }
    };

    return (
        <div className={`flex flex-col h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-opacity duration-300 ${readOnly ? 'opacity-70' : ''} ${className}`}>
            {/* The Toolbar */}
            <div className={`flex items-center gap-1 p-2 border-b border-white/10 bg-white/5 overflow-x-auto ${readOnly ? 'pointer-events-none' : ''}`}>
                <div className="flex items-center gap-1 pr-2 border-r border-white/10 mr-2">
                    <ToolbarButton icon={Bold} title="Bold" onClick={() => execCmd('bold')} disabled={readOnly} />
                    <ToolbarButton icon={Italic} title="Italic" onClick={() => execCmd('italic')} disabled={readOnly} />
                    <ToolbarButton icon={Underline} title="Underline" onClick={() => execCmd('underline')} disabled={readOnly} />
                </div>
                <div className="flex items-center gap-1 pr-2 border-r border-white/10 mr-2">
                    <ToolbarButton icon={Heading1} title="Heading 1" onClick={() => execCmd('formatBlock', 'H1')} disabled={readOnly} />
                    <ToolbarButton icon={Heading2} title="Heading 2" onClick={() => execCmd('formatBlock', 'H2')} disabled={readOnly} />
                </div>
                <div className="flex items-center gap-1 pr-2 border-r border-white/10 mr-2">
                    <ToolbarButton icon={List} title="Bullet List" onClick={() => execCmd('insertUnorderedList')} disabled={readOnly} />
                    <ToolbarButton icon={ListOrdered} title="Numbered List" onClick={() => execCmd('insertOrderedList')} disabled={readOnly} />
                </div>
                <div className="flex items-center gap-1">
                    <ToolbarButton icon={Quote} title="Quote" onClick={() => execCmd('formatBlock', 'BLOCKQUOTE')} disabled={readOnly} />
                    <ToolbarButton icon={Minus} title="Divider" onClick={() => execCmd('insertHorizontalRule')} disabled={readOnly} />
                </div>
            </div>

            <div
                ref={editorRef}
                contentEditable={!readOnly}
                onInput={handleChange}
                className={`flex-1 w-full bg-transparent text-white p-6 outline-none overflow-y-auto prose prose-invert max-w-none ${readOnly ? 'cursor-default' : 'cursor-text'}`}
                style={{ minHeight: '300px' }}
            />
            <style>{`
                /* Styling for the content editable area to match premium feel */
                [contenteditable]:empty:before {
                    content: 'Start writing your sweet memory here...';
                    color: rgba(255,255,255,0.3);
                }
                .prose h1 { color: white; font-size: 2em; font-weight: bold; margin-bottom: 0.5em; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.2rem; }
                .prose h2 { color: white; font-size: 1.5em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; }
                .prose ul, .prose ol { padding-left: 1.5em; margin: 1em 0; }
                .prose list-item { display: list-item; }
                .prose blockquote { border-left: 3px solid rgba(255,255,255,0.3); padding-left: 1em; font-style: italic; color: rgba(255,255,255,0.7); }
                .prose u { text-decoration-color: rgba(255,255,255,0.5); text-underline-offset: 4px; }
            `}</style>
        </div>
    );
});


const MemoryEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { currentUser, switchUser } = useUser();
    const editorRef = useRef<any>(null);

    const [memory, setMemory] = useState<Memory | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showVersions, setShowVersions] = useState(false);

    // Load Initial Data
    useEffect(() => {
        if (!id) return;
        const loadedMemory = memoryService.getMemoryById(id);
        if (loadedMemory) {
            setMemory(loadedMemory);
            setComments(memoryService.getCommentsForMemory(id));
            // Set editor content
            // editorRef.current?.setMarkdown(loadedMemory.content); // This needs to be handled via prop initially
        } else {
            navigate('/memories');
        }
    }, [id, navigate, currentUser]); // reload if user changes potentially?

    // Auto-save logic
    useEffect(() => {
        if (!memory) return;
        // Don't autosave if not owner
        if (memory.author !== currentUser) return;

        const interval = setInterval(() => {
            const currentContent = editorRef.current?.getMarkdown();
            if (currentContent !== undefined && currentContent !== memory.content) {
                setIsSaving(true);
                const updated = memoryService.updateMemoryContent(memory.id, currentContent);
                if (updated) {
                    setMemory(prev => prev ? ({ ...prev, content: currentContent, updatedAt: Date.now() }) : null);
                }
                setTimeout(() => setIsSaving(false), 500);
            }
        }, 5000); // Autosave every 5s

        return () => clearInterval(interval);
    }, [memory, currentUser]);

    const handleManualSave = () => {
        if (!memory) return;
        const currentContent = editorRef.current?.getMarkdown();
        if (currentContent) {
            memoryService.updateMemoryContent(memory.id, currentContent);
            const version = memoryService.saveVersion(memory.id);
            if (version) {
                setMemory(prev => prev ? ({ ...prev, versions: [...prev.versions, version] }) : null);
                alert('Version saved!');
            }
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!memory) return;
        const newTitle = e.target.value;
        setMemory({ ...memory, title: newTitle });

        // Persist title change
        memoryService.updateMemoryTitle(memory.id, newTitle);
    };

    const handlePostComment = () => {
        if (!memory || !newComment.trim()) return;
        const comment = memoryService.addComment(memory.id, currentUser, newComment);
        setComments(prev => [...prev, comment]);
        setNewComment('');
    };

    const exportPDF = () => {
        // Basic PDF export of the markdown content area
        // Ideally we render a hidden clean HTML version to print
        const content = editorRef.current?.getMarkdown();
        if (!content) return;

        // Simple window print hack or jsPDF
        const doc = new jsPDF();
        doc.text(memory?.title || "Memory", 10, 10);
        doc.setFontSize(10);
        const splitText = doc.splitTextToSize(content, 180);
        doc.text(splitText, 10, 20);
        doc.save(`${memory?.title || 'memory'}.pdf`);
    };

    const exportDoc = () => {
        if (!memory) return;
        const content = editorRef.current?.getMarkdown();
        const blob = new Blob(
            [`<html><head><title>${memory.title}</title></head><body><h1>${memory.title}</h1><pre>${content}</pre></body></html>`],
            { type: "application/msword;charset=utf-8" }
        );
        saveAs(blob, `${memory.title}.doc`);
    };

    if (!memory) return <div className="p-10 text-white">Loading...</div>;
    const isOwner = memory.author === currentUser;
    const canEdit = isOwner; // "editing access will be with the owner of that particular note only"

    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col md:flex-row">

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Toolbar */}
                <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/memories')}
                            className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-white/50"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-xs text-white/30 uppercase tracking-widest font-medium mb-1 flex items-center gap-2">
                                Editing Memory
                                <span className={`px-2 rounded-full text-[10px] border ${isOwner ? 'border-green-500/30 text-green-500' : 'border-red-500/30 text-red-500'}`}>
                                    {isOwner ? 'EDIT MODE' : 'READ ONLY'}
                                </span>
                            </span>
                            <input
                                value={memory.title}
                                onChange={handleTitleChange}
                                readOnly={!canEdit}
                                className={`bg-transparent text-2xl font-serif text-white placeholder-white/20 outline-none w-[300px] ${!canEdit ? 'pointer-events-none opacity-80' : ''}`}
                                placeholder="Untitled Memory"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* User Switcher for Testing */}
                        <div className="flex items-center gap-2 mr-4 bg-white/5 rounded-full px-1 border border-white/10">
                            <span className="pl-3 text-[10px] text-white/30 uppercase font-bold">Acting As:</span>
                            {(['Rini', 'Yadish'] as const).map(u => (
                                <button
                                    key={u}
                                    onClick={() => switchUser(u)}
                                    className={`px-3 py-1 text-xs rounded-full transition-all ${currentUser === u ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                                >
                                    {u}
                                </button>
                            ))}
                        </div>

                        {isSaving && <span className="text-xs text-white/30 mr-4 animate-pulse">Saving...</span>}

                        {canEdit && (
                            <button
                                onClick={handleManualSave}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all duration-300 border border-white/10"
                                title="Save Version"
                            >
                                <Save className="w-4 h-4" />
                                <span className="text-sm font-medium">Save Version</span>
                            </button>
                        )}

                        <button
                            onClick={() => setShowVersions(!showVersions)}
                            className={`p-3 rounded-full border border-white/10 transition-colors ${showVersions ? 'bg-white text-black' : 'hover:bg-white/10 text-white/50 hover:text-white'}`}
                            title="View History"
                        >
                            <History className="w-5 h-5" />
                        </button>

                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

                        <button onClick={exportPDF} className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="Export PDF">
                            <Download className="w-5 h-5" />
                        </button>
                        {/* Word export disabled visually if not fully functional, or kept as requested */}
                        <button onClick={exportDoc} className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="Export Word">
                            <span className="font-serif font-bold text-lg leading-none">W</span>
                        </button>
                    </div>
                </div>

                {/* Editor */}
                <div className="flex-1 overflow-y-auto bg-[#0a0a0a] p-4 md:p-6">
                    <div className="max-w-4xl mx-auto h-full">
                        <MDXEditor
                            ref={editorRef}
                            markdown={memory.content}
                            readOnly={!canEdit}
                            onChange={(md: string) => {
                                // Handled by autosave loop reading from ref
                            }}
                            className="h-full shadow-2xl"
                        />
                    </div>
                </div>

                {/* Comments Section (Bottom or Side? Requirements said "add comment". Let's put it at bottom of editor flow or separate panel. Let's do a panel logic but inline for simplicity) */}
                <div className="border-t border-white/10 bg-[#0f0f0f] h-1/3 min-h-[250px] flex flex-col">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Discussion
                        </h3>
                        <span className="text-xs text-white/30">Visible to both</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {comments.length === 0 && <p className="text-sm text-white/20 text-center py-4">No comments yet.</p>}
                        {comments.map(comment => (
                            <div key={comment.id} className={`flex gap-3 ${comment.author === currentUser ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${comment.author === 'Rini' ? 'bg-rose-500' : 'bg-blue-500'}`}>
                                    {comment.author[0]}
                                </div>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${comment.author === currentUser ? 'bg-indigo-600/30 text-white rounded-tr-none' : 'bg-white/10 text-white/80 rounded-tl-none'}`}>
                                    <div className="font-bold text-[10px] opacity-50 mb-1">{comment.author}</div>
                                    {comment.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/5 flex gap-2">
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
                            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                        />
                        <button
                            onClick={handlePostComment}
                            disabled={!newComment.trim()}
                            className="p-2 bg-indigo-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>


            {/* Sidebar for Versions */}
            {showVersions && (
                <div className="w-80 bg-[#0f0f0f] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-lg font-medium font-serif">Version History</h3>
                        <button onClick={() => setShowVersions(false)} className="text-white/50 hover:text-white">
                            &times;
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {memory.versions.length === 0 ? (
                            <p className="text-white/30 text-sm text-center py-8">No saved versions yet.</p>
                        ) : (
                            [...memory.versions].reverse().map((version, i) => (
                                <div key={version.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                    onClick={() => {
                                        if (confirm("Restore this version? current changes will be overwritten unless saved.")) {
                                            editorRef.current?.setMarkdown(version.content);
                                            // Also update memory content ref
                                            setMemory({ ...memory, content: version.content });
                                            // Trigger save logic if needed or just let autosave catch it
                                            setShowVersions(false);
                                        }
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-white/70">Version {memory.versions.length - i}</span>
                                        <span className="text-[10px] text-white/30">
                                            {new Date(version.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-white/30 mb-2">
                                        {new Date(version.savedAt).toLocaleDateString()}
                                    </div>
                                    <button className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click to Restore
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryEditor;
