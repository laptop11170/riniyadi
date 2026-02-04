
import React, { createContext, useContext, useState, useEffect } from 'react';

export type User = 'Yadish' | 'Rini';

interface UserContextType {
    currentUser: User;
    switchUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User>(() => {
        const saved = localStorage.getItem('rini_current_user');
        return (saved === 'Yadish' || saved === 'Rini') ? saved : 'Yadish';
    });

    useEffect(() => {
        localStorage.setItem('rini_current_user', currentUser);
    }, [currentUser]);

    const switchUser = (user: User) => {
        setCurrentUser(user);
        // Force reload to refresh data view permissions if needed, 
        // or just let react state handle it.
        // window.location.reload(); 
    };

    return (
        <UserContext.Provider value={{ currentUser, switchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
