import React, { useState } from "react";
import axios from '../Security/axiosInstance';
import './Login.css'; // Note the change in CSS file name for uniqueness
import { useNavigate, Link } from "react-router-dom";
import { useBodyStyle } from "../../useBodyStyles";
import { baseUrl } from "../../url";

function Login() {
    useBodyStyle({
        background: '#000',
        color: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh', // Adjusted for full viewport height
        fontFamily: 'Inter, sans-serif',
    });

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/login`, { email, password });
            const { token, userId } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                navigate("/home");
            } else {
                alert("Login failed: Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred during login.", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="login-page-container">
            
                <div className="login-container">
                    <div className="login-background-image"></div>
                    <div className="login-block">
                        <form onSubmit={submit} className="login-form">
                            <h1 className="login-title">Login</h1>
                            <label htmlFor="username" className="login-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                            />
                            <div className="login-line"></div>
                            <label htmlFor="password" className="login-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                            />
                            <div className="login-line"></div>
                            <button type="submit" className="login-button">Login</button>
                        </form>
                        <Link to="/signup" className="login-account-link">Didn't have an Account?</Link>
                    </div>
                </div>
            </div>
        
    );
}

export default Login;
