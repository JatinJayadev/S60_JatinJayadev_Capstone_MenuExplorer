import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RestaurantDetails.css';

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedUserId = localStorage.getItem('userId');
        setUserId(loggedUserId);

        axios.get(`http://localhost:4050/restaurants/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurant(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleUpdateClick = (item) => {
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleDeleteClick = (categoryId, itemId) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:4050/restaurants/${id}/menu/${categoryId}/items/${itemId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurant(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put(`http://localhost:4050/restaurants/${id}/menu/${currentItem.categoryId}/items/${currentItem._id}`, currentItem, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurant(response.data);
                setShowModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div className="restaurant-details">
            <h1>{restaurant.restaurantName}</h1>
            <p>Location: {restaurant.area}, {restaurant.city}, {restaurant.state} - {restaurant.pincode}</p>
            <p>Opening Time: {restaurant.openingTime}</p>
            <p>Closing Time: {restaurant.closingTime}</p>
            <p>Cuisine: {restaurant.cuisineType}</p>
            <p>Location: <a href={restaurant.location} target="_blank" rel="noopener noreferrer">Google Maps Link</a></p>

            <h3>Menu</h3>
            {restaurant.menu.map((category, index) => (
                <div key={index} className="menu-category">
                    <h4>{category.category}</h4>
                    {category.items.map((item, idx) => (
                        <div key={idx} className="menu-item">
                            <p>{item.name} - ₹{item.price}</p>
                            <p>{item.description}</p>

                            {restaurant.owner === userId && (
                                <div className="item-actions">
                                    <button onClick={() => handleUpdateClick(item)}>Update</button>
                                    <button onClick={() => handleDeleteClick(category._id, item._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            {showModal && currentItem && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Menu Item</h2>
                        <form onSubmit={handleModalSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={currentItem.name}
                                    onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    value={currentItem.price}
                                    onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={currentItem.description}
                                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                />
                            </div>
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantDetails;