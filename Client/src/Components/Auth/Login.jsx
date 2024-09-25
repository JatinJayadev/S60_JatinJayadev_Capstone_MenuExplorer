// components/Login.js
import { useState } from 'react';
import axios from 'axios';
import GoogleLogin from '../Firebase/FirebaseLogin';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4050/login', { email, password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                alert('Login successful');
                console.log(response)
                navigate('/');
            })
            .catch((err) => {
                alert('Login failed');
                console.log(err)
            });
    };

    return (
        <div className='container'>
            <div className='login-container'>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <center>
                            <h2 className='heading'>Login</h2>
                        </center>
                        <hr />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="pasword">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div>
                    <GoogleLogin />
                </div>
                <div className='span'>
                    <span>Don't have an account? <Link to="/signup">SigUp here</Link> </span>
                </div>
            </div>
        </div>

    );
};

export default Login;
