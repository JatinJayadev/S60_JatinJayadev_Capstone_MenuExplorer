import './Nav.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <div className='nav-div'>
                <div>
                    <h2>
                        <Link className='logo' to='/'>menuExplorer</Link>
                    </h2>
                </div>
                <div className='nav-input'>
                    <input type="search" placeholder='Search for Restaurant' />
                </div>
                <div className='nav-div nav-div-p'>
                    <p>
                        <Link to='/addRestuarant' className='nav-link'>Add a Restaurant</Link>
                    </p>
                    {/* <p>
                        <Link className='nav-link'>About</Link>
                    </p> */}
                    <p>
                        <Link className='nav-link' to='/manage-restaurants'>Manage Restaurant</Link>
                    </p>
                    <p>
                        <Link className='nav-link'>Profile</Link>
                    </p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar