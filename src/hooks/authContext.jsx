import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../API';

const AuthContext = createContext();

const useAuth = () => {
    // get shared context
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

const AuthProvider = ({ children }) => {
    // authenticated state
    const [authenticated, setAuthenticated] = useState(false);

    // infor user logged in
    const [user, setUser] = useState({});

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
        setUser({});
    };
    const loadUser = async () => {
        const { userId, token } = authAPI.getCurrentUser();
        if (userId && token) {
            const userInfor = await authAPI.getUserById(userId, token);
            setUser(userInfor);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId && Object.keys(user).length === 0) {
            login();
            loadUser();
        }
    }, []);

    // Auth provider for sharing autenticated state
    return (
        <AuthContext.Provider value={{ authenticated, login, logout, user, setUser }}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
