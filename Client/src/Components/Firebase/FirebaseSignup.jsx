import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from './Firebase';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

const GoogleSignup = () => {
    // const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user)

                axios.post('http://localhost:4050/googlesignup', {
                    name: user.displayName,
                    email: user.email
                })
                    .then((response) => {
                        alert('Signup/Login successful');
                        // navigate('/');
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Signup/Login failed');
                    });
            }).catch((error) => {
                console.error('Error during sign-in with Google:', error);
            });
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
        </div>
    );
}

// function SignUp() {
//     function sig() {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 // This gives you a Google Access Token. You can use it to access the Google API.
//                 const credential = GoogleAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;
//                 const user = result.user;
//                 console.log(user)

//             }).catch((error) => {
//                 console.error('Error during sign-in with Google:', error);
//             });
//     }
//     return (
//         <>
//             <button onClick={sig} >sign</button>
//         </>
//     )

// }

export default GoogleSignup;