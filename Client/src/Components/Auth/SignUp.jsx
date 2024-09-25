// components/Signup.js
import { useState } from 'react';
import axios from 'axios';
import GoogleSignup from '../Firebase/FirebaseSignup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Auth.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4050/register', { name, email, password })
            .then(() => {
                alert('Signup successful');
                // navigate('/login');
            })
            .catch(() => {
                alert('Signup failed');
            });
    };

    return (
        <div className='container'>
            <div className='signup-container'>
                <div>
                    <form className='signup-login-form' onSubmit={handleSubmit}>
                        <center>
                            <h2 className='signup-login'>Signup</h2>
                        </center>
                        <hr />
                        <label className='signup-login-label' htmlFor="name">Name</label>
                        <input
                            className='signup-login-input'
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label className='signup-login-label' htmlFor="email">Email</label>
                        <input
                            className='signup-login-input'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className='signup-login-label' htmlFor="password">Password</label>
                        <input
                            className='signup-login-input'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Signup</button>
                    </form>
                </div>
                <div>
                    <GoogleSignup />
                </div>
                <div className='span'>
                    <span>Have an account? <Link to="/login">Login here</Link> </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;