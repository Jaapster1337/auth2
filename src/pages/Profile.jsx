import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {isAuth} = useContext(AuthContext)
    const [privCont, setPrivCont] = useState({})

    useEffect(() => {
        void fetchPrivateContent()
    }, []);

    async function fetchPrivateContent() {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get('http://localhost:3000/660/private-content', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setPrivCont(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {isAuth?.user.username}</p>
                <p><strong>Email:</strong> {isAuth?.user.email}</p>
            </section>
            <section>
                {privCont.user ? <h2>{privCont.title}</h2> : <h2>Top geheime informatie</h2>}
                {privCont.content ? <p>{privCont.content}</p> : <p>Shhhhh.... dit mag je niet zien</p>}
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;