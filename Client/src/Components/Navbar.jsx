import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ searchQuery, setSearchQuery, userProfileLink }) {
    const navigate = useNavigate();
    let isLoggedIn = false;

    if (localStorage.getItem('token')) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <div className='nav-div'>
                <div>
                    <h2>
                        <Link className='logo' to='/'>menuExplorer</Link>
                    </h2>
                </div>
                <div className='nav-input'>
                    <input type="search" placeholder='Search for Restaurant'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className='nav-div nav-div-p'>
                    <p>
                        <Link to='/addRestuarant' className='nav-link'>Add a Restaurant</Link>
                    </p>
                    <p>
                        <Link className='nav-link' to='/manage-restaurants'>Manage Restaurant</Link>
                    </p>
                    {isLoggedIn ? (
                        <>
                            <div className='profile-container'>
                                <img
                                    src={userProfileLink}
                                    alt="Profile"
                                    className='profile-pic'
                                />
                                <p>
                                    <Link className='nav-link' to='/profile'>Profile</Link>
                                </p>
                            </div>
                            <p onClick={logout} className='nav-link'>Logout</p>
                        </>
                    ) : (
                        <p>
                            <Link className='nav-link' to='/login'>Login</Link>
                        </p>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
