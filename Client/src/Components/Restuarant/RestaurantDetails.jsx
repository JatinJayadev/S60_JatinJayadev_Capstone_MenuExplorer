import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h1>{restaurant.restaurantName}</h1>
            <p>Cuisine: {restaurant.cuisineType}</p>
            <p>Location: {restaurant.location}</p>
            <h2>Menu</h2>
            <ul>
                {restaurant.menu.map((category) => (
                    <li key={category.category}>
                        <h3>{category.category}</h3>
                        <ul>
                            {category.items.map((item) => (
                                <li key={item.name}>
                                    {item.name} - ${item.price}: {item.description}
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
