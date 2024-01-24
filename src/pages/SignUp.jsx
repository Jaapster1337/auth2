import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {InputField} from "../components/InputField";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        console.log(name, email, password)
        void signUp()
    }

    async function signUp(){
        try{
            const response = await axios.post('http://localhost:3000/register',{
                name:name,
                email:email,
                password:password
            })
            console.log("Response", response.data)
        }catch (error){
            console.log(error.message)
        } finally{
            navigate("/signin")
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="name"
                    placeholder="Naam"
                    value={name}
                    onchange={(e) => setName(e.target.value)}
                />
                <InputField
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    value={password}
                    onchange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}


export default SignUp;