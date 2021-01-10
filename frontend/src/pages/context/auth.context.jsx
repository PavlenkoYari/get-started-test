/**
 * external libs
 */
import React, {createContext, useState} from 'react';
/**
 *  components
 */
import AuthService from '../../services/auth.service';

/**
 * constants
 */

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(AuthService.isAuthenticated);
    AuthService.setIsAuth = setIsAuth;

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, isAdmin: true}}>{children}</AuthContext.Provider>
    );
}
