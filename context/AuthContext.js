import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { firebaseLogin } from '@/firebase/main';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = async (userData) => {
        setLoading(true)
        const result = await firebaseLogin(userData);
        if (result && !result.error) {
            setUser(result);
            localStorage.setItem('user', JSON.stringify(result));
            setLoading(false)
            router.push('/')
        } else {
            setLoading(false)
            setUser(null)
        }
    };

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;