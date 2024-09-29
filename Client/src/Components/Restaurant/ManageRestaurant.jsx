import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageRestaurant.css';

function ManageRestaurant() {
    const [ownedRestaurants, setOwnedRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:4050/restaurantsOwned', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setOwnedRestaurants(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleRestaurantClick = (id) => {
        navigate(`/restaurants/${id}`);
    };

    return (
        <div className="manage-restaurants">
            <h1>Manage Restaurants</h1>
            <div className="restaurant-list">
                {ownedRestaurants.map((restaurant) => (
                    <div
                        key={restaurant._id}
                        className="restaurant-card"
                        onClick={() => handleRestaurantClick(restaurant._id)}
                    >
                        <h2>{restaurant.restaurantName}</h2>
                        <p>Cuisine: {restaurant.cuisineType}</p>
                        <img src={restaurant.image} alt={`${restaurant.restaurantName} image`} className="restaurant-image" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageRestaurant;


