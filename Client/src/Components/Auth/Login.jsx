// components/Login.js
import { useState } from 'react';
import axios from 'axios';
import GoogleLogin from './Firebase/FirebaseLogin';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

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
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
            <div>
                <span>Don't have an account? <Link to="/signup">SigUp here</Link> </span>
            </div>
        </div>
    );
};

export default Login;
