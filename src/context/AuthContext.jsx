import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import axios from "axios";

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
    const navigate = useNavigate()
    useEffect(() => {
        console.log("Context wordt gerefresht!")
        if(localStorage.getItem("token")){
            const decoded = jwtDecode(localStorage.getItem("token"))
            const token = localStorage.getItem("token")
            void fetchUserData(decoded, token)
            console.log("er is een token", token)
        }else{
            setIsAuth({isAuth: false,
                user:"",
                status: "done",
            })
            console.log("er is geen token")
        }
    }, []);

    const [isAuth, setIsAuth] = useState({
        isAuth: false, user: {
            email: "",
            password: "",
            username: "",
        },
        status: "pending",
    });


    function logOut() {
        setIsAuth({isAuth: false, user: ''});
        localStorage.removeItem("token")
        navigate('/')
        console.log("Gebruiker is uitgelogd!")
        setIsAuth({isAuth: false,
            user:"",
            status: "done",
        })
    }

    function logIn(email, password, token) {
        // console.log("Gebruiker is ingelogd!")
        setIsAuth((isAuth) => ({
            ...isAuth,
            isAuth: true,
            user: {...isAuth.user, email: email, password: password, token: token}
        }));
        localStorage.setItem("token", token)
        console.log("token", token)
        const decoded = jwtDecode(token)
        console.log("decoded", decoded)
        void fetchUserData(decoded, token)
    }

    async function fetchUserData(decoded, token) {
        const id = decoded.sub
        console.log("id",id)
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("response", response)
            setIsAuth({isAuth: true, user:{
                username: response.data.name,
                email: response.data.email,
                id: response.data.id,
                },
                status: "done",
            })
        } catch (e) {
            console.error(e)
        } finally {
            navigate("/profile")
        }
    }


    const data = {
        isAuth,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

