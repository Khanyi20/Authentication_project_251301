import React, {useState} from "react";
import axios from "axios";
import ChessGame from "../components/ChessGame";

function Registration() {
     const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sequence, setSequence] = useState([]);

    const handleRegistration = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password,
                chessSequence: sequence
            }
        );
        alert(res.data.message);


        } catch (err) {
            console.log(err);
            alert("Registration failed");
        }
    };

    return (
        <div>

            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <ChessGame setSequence={setSequence} />

            <button onClick={handleRegistration}>
                Register
            </button>

        </div>
    );
}

export default Registration;



// chessAuth