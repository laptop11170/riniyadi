
export type User = 'Yadish' | 'Rini';

export interface MemoryVersion {
    id: string;
    content: string;
    savedAt: number;
}

export interface Comment {
    id: string;
    memoryId: string;
    author: User;
    text: string;
    createdAt: number;
}

export interface Memory {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: number;
    updatedAt: number;
    versions: MemoryVersion[];
}

const STORAGE_KEYS = {
    MEMORIES: 'rini_memories',
    COMMENTS: 'rini_comments'
};

export const memoryService = {
    // Helpers
    _getMemories: (): Memory[] => {
        const data = localStorage.getItem(STORAGE_KEYS.MEMORIES);
        return data ? JSON.parse(data) : [];
    },

    _saveMemories: (memories: Memory[]) => {
        localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
    },

    _getComments: (): Comment[] => {
        const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
        return data ? JSON.parse(data) : [];
    },

    _saveComments: (comments: Comment[]) => {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    },

    // Public API
    getAllMemories: (): Memory[] => {
        return memoryService._getMemories().sort((a, b) => b.updatedAt - a.updatedAt);
    },

    getMemoriesByAuthor: (author: User): Memory[] => {
        return memoryService.getAllMemories().filter(m => m.author === author);
    },

    getMemoryById: (id: string): Memory | undefined => {
        return memoryService._getMemories().find(m => m.id === id);
    },

    createMemory: (title: string, author: User, initialContent: string = ''): Memory => {
        const memories = memoryService._getMemories();
        const newMemory: Memory = {
            id: crypto.randomUUID(),
            title,
            author,
            content: initialContent,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            versions: []
        };
        memories.push(newMemory);
        memoryService._saveMemories(memories);
        return newMemory;
    },

    updateMemoryContent: (id: string, content: string): Memory | null => {
        const memories = memoryService._getMemories();
        const index = memories.findIndex(m => m.id === id);
        if (index === -1) return null;

        memories[index].content = content;
        memories[index].updatedAt = Date.now();

        memoryService._saveMemories(memories);
        return memories[index];
    },

    updateMemoryTitle: (id: string, title: string): Memory | null => {
        const memories = memoryService._getMemories();
        const index = memories.findIndex(m => m.id === id);
        if (index === -1) return null;

        memories[index].title = title;
        memories[index].updatedAt = Date.now();

        memoryService._saveMemories(memories);
        return memories[index];
    },

    saveVersion: (id: string): MemoryVersion | null => {
        const memories = memoryService._getMemories();
        const index = memories.findIndex(m => m.id === id);
        if (index === -1) return null;

        const memory = memories[index];
        const newVersion: MemoryVersion = {
            id: crypto.randomUUID(),
            content: memory.content,
            savedAt: Date.now()
        };

        memory.versions.push(newVersion);
        memoryService._saveMemories(memories);
        return newVersion;
    },

    addComment: (memoryId: string, author: User, text: string): Comment => {
        const comments = memoryService._getComments();
        const newComment: Comment = {
            id: crypto.randomUUID(),
            memoryId,
            author,
            text,
            createdAt: Date.now()
        };
        comments.push(newComment);
        memoryService._saveComments(comments);
        return newComment;
    },

    getCommentsForMemory: (memoryId: string): Comment[] => {
        return memoryService._getComments()
            .filter(c => c.memoryId === memoryId)
            .sort((a, b) => a.createdAt - b.createdAt);
    }
};
