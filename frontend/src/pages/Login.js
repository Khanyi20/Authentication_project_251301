import React, { useState } from "react";
import axios from "axios";
import ChessGame from "../components/ChessGame";

function Login() {

    const [email, setEmail] = useState("");
    const [sequence, setSequence] = useState([]);

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",
                {
                    email,
                    chessSequence: sequence
                }
            );
            localStorage.setItem("token", res.data.token);
            alert("Login successful");


        } catch (err) {
            alert("Invalid sequence");
        }
    };

    return (

        <div>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <ChessGame setSequence={setSequence} />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
}

export default Login;