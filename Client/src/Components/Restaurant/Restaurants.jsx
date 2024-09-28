import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Restaurants() {
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

    return (
        <div>
            <h1>Restaurants</h1>
            {restaurants && restaurants.map((data) => (
                <div key={data._id} className="restaurant-card">
                    <Link to={`/restaurants/${data._id}`}>
                        <h2>{data.restaurantName}</h2>
                        <p>Cuisine: {data.cuisineType}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Restaurants;

