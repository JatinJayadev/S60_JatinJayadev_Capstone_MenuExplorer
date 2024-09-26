import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RestaurantDetails.css'; // Make sure to import your CSS

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4050/restaurants/${id}`)
            .then((response) => {
                console.log(response.data);
                setRestaurant(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div className="restaurant-details-container">
            <h1>{restaurant.restaurantName}</h1>
            <p>Cuisine: {restaurant.cuisineType}</p>
            <p>Location: {restaurant.location}</p>

            <h2 className='menu' >Menu</h2>
            <ul className="menu-list">
                {restaurant.menu.map((category) => (
                    <li key={category.category} className="menu-category">
                        <h3>{category.category}</h3>
                        <ul>
                            {category.items.map((item) => (
                                <li key={item.name} className="menu-item">
                                    <span>{item.name}</span> - ${item.price}: {item.description}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantDetails;
