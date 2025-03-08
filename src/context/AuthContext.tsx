import { createContext } from 'react';

export interface AuthContextType {
    isLoggedIn : boolean;
    loggedUser: any,
    login: any,
    register: any,
    handleLogout: any,
}

const defaultValue: AuthContextType = {
    isLoggedIn: false,
    loggedUser: {},
    login: () => {},
    register: () => {},
    handleLogout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
