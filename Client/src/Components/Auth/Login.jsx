import { useState } from 'react';
import axios from 'axios';
import GoogleLogin from '../Firebase/FirebaseLogin';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ setUserProfileLink, userProfileLink }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4050/login', { email, password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('userID', response.data.userID)
                setUserProfileLink(response.data.profileLink);
                alert('Login successful');
                navigate('/');
            })
            .catch((err) => {
                alert('Login failed');
                console.log(err);
            });
    };


    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!otpSent) {
            axios.post('http://localhost:4050/forgot-password', { email })
                .then((response) => {
                    sessionStorage.setItem('hashedOtp', response.data.hashedOtp);
                    setOtpSent(true);
                    alert('OTP sent to your email');
                })
                .catch((err) => {
                    alert('Failed to send OTP');
                    console.log(err);
                });
        } else {
            const hashedOtp = sessionStorage.getItem('hashedOtp');
            axios.post('http://localhost:4050/verify-otp', { email, otp, newPassword, hashedOtp })
                .then((response) => {
                    alert('Password updated successfully');
                    setOtpSent(false);
                    setIsForgotPassword(false);
                    navigate('/login');
                    sessionStorage.removeItem('hashedOtp')
                })
                .catch((err) => {
                    alert('Invalid OTP or failed to update password');
                    console.log(err);
                });
        }
    };

    return (
        <div className='container'>
            <div className='login-container'>
                <div className='form'>
                    <form className='signup-login-form' onSubmit={isForgotPassword ? handleForgotPassword : handleSubmitLogin}>
                        <center>
                            <h2 className='heading'>{isForgotPassword ? 'Forgot Password' : 'Login'}</h2>
                        </center>
                        <hr />
                        <label className='signup-login-label' htmlFor="email">Email</label>
                        <input
                            className='signup-login-input'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {!isForgotPassword && !otpSent && (
                            <>
                                <label className='signup-login-label' htmlFor="password">Password</label>
                                <input
                                    className='signup-login-input'
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit">Login</button>
                            </>
                        )}

                        {isForgotPassword && otpSent && (
                            <>
                                <label className='signup-login-label' htmlFor="otp">OTP</label>
                                <input
                                    className='signup-login-input'
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <label className='signup-login-label' htmlFor="newPassword">New Password</label>
                                <input
                                    className='signup-login-input'
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button type="submit">Submit OTP & Change Password</button>
                            </>
                        )}

                        {!otpSent && isForgotPassword && (
                            <button type="submit">Send OTP</button>
                        )}
                    </form>
                </div>
                {!isForgotPassword && (
                    <>
                        {/* <div>
                            <GoogleLogin />
                        </div> */}
                        <div className='span'>
                            <span>Don't have an account? <Link to="/signup">SignUp here</Link></span>
                        </div>
                        <span className='forgot-password' onClick={() => setIsForgotPassword(true)}>Forgot Password?</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;