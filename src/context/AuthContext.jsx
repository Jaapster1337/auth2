import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false, user: {
            email: "",
            password: "",
            username: "",
            token:""
        }
    });
    const navigate = useNavigate()

    function logOut() {
        console.log("Gebruiker is uitgelogd!")
        setIsAuth({isAuth: false, user: ''});
        navigate('/')
    }

    function logIn(email, password, token) {
        console.log("Gebruiker is ingelogd!")
        setIsAuth((isAuth) => ({
            ...isAuth,
            isAuth: true,
            user: {...isAuth.user, email: email, password: password, token: token}
        }));
        localStorage.setItem("token", token)
        console.log(token)
        const decoded = jwtDecode(token)
        console.log("decoded", decoded)
    }

    const data = {
        isAuth,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

