import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageRestaurant() {
    const [ownedRestaurants, setOwnedRestaurants] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:4050/restaurantsOwned', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setOwnedRestaurants(response.data);
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>Manage Restaurants</h1>
            {ownedRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="restaurant-card">
                    <h2>{restaurant.restaurantName}</h2>
                    <p>Cuisine: {restaurant.cuisineType}</p>
                </div>
            ))}
        </div>
    );
}

export default ManageRestaurant;