import {createContext, useState} from "react";

export const AuthContext = createContext({});

export function AuthContextProvider({children}){
    const [isAuth, setIsAuth] = useState(0);

    function setAuthTrue(){
        setIsAuth(true)
    }

    function setAuthFalse(){
        setIsAuth(false)
    }

    const data = {
        isAuth: false,
    }

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}