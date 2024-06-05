import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Ensure this points to the correct CSS file for Signup
import { baseUrl } from "../../url";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function submit(e) {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${baseUrl}/signup`, { email, password, name });
    
            if (response.status === 201) {
                const { token, userId } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
    
                setSuccessMessage("Signup successful! Redirecting to home...");
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } else {
                console.error("Unexpected status code:", response.status);
            }
        } catch (error) {
            console.log('Error', error.message);
            alert("An error occurred. Please try again.");
        }
    }
    
    return (
        <div className="signupContainerUnique">
            <div className="signupBackgroundImageUnique"></div>
            <div className="signupBlockUnique">
                {successMessage && <div className="signupSuccessMessageUnique">{successMessage}</div>}
                <form onSubmit={submit} className="signupFormClassUnique">
                    <h1 className="signupTitleUnique">Sign Up</h1>
                    <label htmlFor="name" className="signupLabelUnique">Name</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        className="signupInputUnique"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="signupLineUnique"></div>
                    <label htmlFor="email" className="signupLabelUnique">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        className="signupInputUnique"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="signupLineUnique"></div>
                    <label htmlFor="password" className="signupLabelUnique">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="signupInputUnique"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="signupLineUnique"></div>
                    <button type="submit" className="signupButtonUnique">Signup</button>
                </form>
                <Link to="/login" className="signupAccountLinkUnique">Already Have an Account</Link>
            </div>
        </div>
    );
} 

export default Signup;
