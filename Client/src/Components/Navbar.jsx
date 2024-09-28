import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Navbar({ searchQuery, setSearchQuery, userProfileLink }) {
    const navigate = useNavigate();
    let isLoggedIn = false;

    if (localStorage.getItem('token')) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    const handlePayment = async () => {
        try {
            const orderResponse = await axios.post(
                "http://localhost:4050/razorPay",
            );

            const { amount, id: order_id, currency } = orderResponse.data;

            const options = {
                key: "rzp_test_EzUsahd1tsDo2l",
                amount: amount.toString(),
                currency: currency,
                name: "MenuExplorer",
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                    console.log(response)
                    alert("Payment Successful!");
                },
                prefill: {
                    name: "Jatin Jayadev"
                },
                theme: {
                    color: "#000000",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed. Please try again.");
        }
    };
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
                    <p onClick={handlePayment}>Razor</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
