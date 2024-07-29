// components/GoogleLogin.js
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from './Firebase';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

const GoogleLogin = () => {
    // const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                axios.post('http://localhost:4050/googlelogin', {
                    email: user.email
                })
                    .then((response) => {
                        alert('Login successful');
                        // navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error during authentication:', error);
                        alert('Login failed');
                    });
            }).catch((error) => {
                console.error('Error during sign-in with Google:', error);
            });
    };

    return (
        <div>
            <button onClick={handleGoogleSignIn}>Login with Google</button>
        </div>
    );
};

export default GoogleLogin;
