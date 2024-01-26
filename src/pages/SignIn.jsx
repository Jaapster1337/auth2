import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {InputField} from "../components/InputField";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {logIn} = useContext(AuthContext)
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        void postLogIn()
    }

    async function postLogIn(){
        try {
            const response = await axios.post("http://localhost:3000/login",{
                email:email,
                password:password,
            })
            console.log("response", response)
            // const token = response.data.accessToken
            logIn(email, password, response.data.accessToken)

        } catch (e){
            console.error(e)
        }finally {
            console.log("postLogIn complete")
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Email"
                    onchange={(e)=>setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    onchange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;