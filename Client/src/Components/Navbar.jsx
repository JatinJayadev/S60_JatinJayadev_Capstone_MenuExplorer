import './Nav.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <div className='nav-div'>
                <div>
                    <h2>menuExplorer</h2>
                </div>
                <div className='nav-input'>
                    <input type="search" placeholder='Search for Restaurant' />
                </div>
                <div className='nav-div nav-div-p'>
                    <p>
                        <Link className='nav-link'>Add a Restaurant</Link>
                    </p>
                    <p>
                        <Link className='nav-link'>About</Link>
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