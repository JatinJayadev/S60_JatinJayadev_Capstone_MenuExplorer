import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Restaurants.css'

function Restaurants({ searchQuery }) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4050/restaurants')
            .then((response) => {
                console.log(response.data);
                setRestaurants(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='restaurants-container'>
            <h1>Restaurants</h1>
            <div className='restaurants-div'>
                {filteredRestaurants && filteredRestaurants.map((data) => (
                    <div key={data._id} className="restaurant-card restaurant-card-container ">
                        <Link className='link-tag-none' to={`/restaurants/${data._id}`}>
                            <h2>{data.restaurantName}</h2>
                            <p>Cuisine: {data.cuisineType}</p>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Restaurants;