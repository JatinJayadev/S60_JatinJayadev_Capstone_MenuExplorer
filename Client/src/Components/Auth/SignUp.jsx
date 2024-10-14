// components/Signup.js
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import GoogleSignup from '../Firebase/FirebaseSignup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Auth.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const wid = useRef(null);

    useEffect(() => {
        let myWidget = cloudinary.createUploadWidget(
            {
                cloudName: "dvfqbegfy",
                uploadPreset: "MenuExplorer",
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info.secure_url);
                    setPhotoLink(result.info.secure_url)
                }
            }
        );
        wid.current = myWidget;
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/register', { name, email, password, photoLink })
            .then(() => {
                alert('Signup successful');
                navigate('/login');
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
                        <label htmlFor="">Upload Photo</label>
                        <button onClick={() => {
                            wid.current.open();
                        }} required >Upload</button>
                        {photoLink && (
                            <div>
                                <span>Image uploaded successfully!</span>
                            </div>
                        )}
                        <button type="submit">Signup</button>
                    </form>
                </div>
                {/* <div>
                    <GoogleSignup />
                </div> */}
                <div className='span'>
                    <span>Have an account? <Link to="/login">Login here</Link> </span>
                </div>
            </div >
        </div >
    );
};

export default Signup;