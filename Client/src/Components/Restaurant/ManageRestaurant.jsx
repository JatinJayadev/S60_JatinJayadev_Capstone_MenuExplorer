import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageRestaurant.css';

function ManageRestaurant() {
    const [ownedRestaurants, setOwnedRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/restaurantsOwned', {
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
        <div className="restaurants-container">
            <h1>Manage Restaurants</h1>
            <div className="restaurants-div">
                {ownedRestaurants.map((restaurant) => (
                    <div
                        key={restaurant._id}
                        className="restaurant-card restaurant-card-container"
                        onClick={() => handleRestaurantClick(restaurant._id)}
                    >
                        <h2>{restaurant.restaurantName}</h2>
                        <p>Cuisine: {restaurant.cuisineType}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageRestaurant;


