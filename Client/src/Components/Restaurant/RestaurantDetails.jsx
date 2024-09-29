import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RestaurantDetails.css';


function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showRestaurantModal, setShowRestaurantModal] = useState(false);
    const [updatedRestaurant, setUpdatedRestaurant] = useState({
        restaurantName: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        openingTime: '',
        closingTime: '',
        cuisineType: '',
    });
    const navigate = useNavigate();

    const getBack = () => {
        navigate('/manage-restaurants')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedUserId = localStorage.getItem('userID');
        setUserId(loggedUserId);

        axios.get(`http://localhost:4050/restaurants/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurant(response.data);
                setUpdatedRestaurant({
                    restaurantName: response.data.restaurantName,
                    area: response.data.area,
                    city: response.data.city,
                    state: response.data.state,
                    pincode: response.data.pincode,
                    openingTime: response.data.openingTime,
                    closingTime: response.data.closingTime,
                    cuisineType: response.data.cuisineType,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleUpdateSectionClick = (category) => {
        setCurrentCategory(category);
        setShowCategoryModal(true);
    };

    const handleDeleteSectionClick = (categoryId) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:4050/restaurants/${id}/menu/${categoryId}`, {
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

    const handleDeleteMenuClick = (itemId) => {
        const updatedItems = currentCategory.items.filter(item => item._id !== itemId);
        setCurrentCategory({ ...currentCategory, items: updatedItems });
    };

    const handleAddMenuClick = () => {
        const newItem = {
            name: '',
            price: 0,
            description: '',
        };
        setCurrentCategory({
            ...currentCategory,
            items: [...currentCategory.items, newItem],
        });
    };

    const handleCategoryModalSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put(`http://localhost:4050/restaurants/${id}/menu/${currentCategory._id}`, currentCategory, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurant(response.data);
                setShowCategoryModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCategoryInputChange = (index, field, value) => {
        const updatedItems = [...currentCategory.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setCurrentCategory({ ...currentCategory, items: updatedItems });
    };

    const handleRestaurantModalSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put(`http://localhost:4050/restaurants/${id}`, updatedRestaurant, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurant(response.data);
                setShowRestaurantModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteRestaurant = () => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:4050/restaurants/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {

                alert('Restaurant deleted successfully!');
                navigate('/manage-restaurants')
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
                        </div>
                    ))}
                    {restaurant.owner === userId && (
                        <div className="category-actions">
                            <button onClick={() => handleUpdateSectionClick(category)}>Update Section</button>
                            <button onClick={() => handleDeleteSectionClick(category._id)}>Delete Section</button>
                        </div>
                    )}
                </div>
            ))}

            {/* Buttons to open restaurant update modal and delete restaurant */}
            {restaurant.owner === userId && (
                <div className="restaurant-actions">
                    <button onClick={() => setShowRestaurantModal(true)}>Update Restaurant Details</button>
                    <button onClick={handleDeleteRestaurant}>Delete Restaurant</button>
                    <button onClick={getBack}>Back</button>
                </div>
            )}

            {/* Update Section Modal */}
            {showCategoryModal && currentCategory && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Section</h2>
                        <form onSubmit={handleCategoryModalSubmit}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={currentCategory.category}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, category: e.target.value })}
                                />
                            </div>
                            <h3>Items in this Category</h3>
                            {currentCategory.items.map((item, idx) => (
                                <div key={idx} className="menu-item">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleCategoryInputChange(idx, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => handleCategoryInputChange(idx, 'price', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => handleCategoryInputChange(idx, 'description', e.target.value)}
                                        />
                                    </div>
                                    <button type="button" onClick={() => handleDeleteMenuClick(item._id)}>Delete Menu</button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddMenuClick}>Add Menu</button>
                            <button type="submit">Update Section</button>
                            <button type="button" onClick={() => setShowCategoryModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Restaurant Modal */}
            {showRestaurantModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Restaurant</h2>
                        <form onSubmit={handleRestaurantModalSubmit}>
                            <div className="form-group">
                                <label>Restaurant Name</label>
                                <input
                                    type="text"
                                    value={updatedRestaurant.restaurantName}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, restaurantName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Area</label>
                                <input
                                    type="text"
                                    value={updatedRestaurant.area}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, area: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    value={updatedRestaurant.city}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, city: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    value={updatedRestaurant.state}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, state: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    value={updatedRestaurant.pincode}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, pincode: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Opening Time</label>
                                <input
                                    type="time"
                                    value={updatedRestaurant.openingTime}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, openingTime: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Closing Time</label>
                                <input
                                    type="time"
                                    value={updatedRestaurant.closingTime}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, closingTime: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Cuisine Type</label>
                                <input
                                    type="text"
                                    value={updatedRestaurant.cuisineType}
                                    onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, cuisineType: e.target.value })}
                                />
                            </div>
                            <button type="submit">Update Restaurant</button>
                            <button type="button" onClick={() => setShowRestaurantModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantDetails;




































// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './RestaurantDetails.css';

// function RestaurantDetails() {
//     const { id } = useParams();
//     const [restaurant, setRestaurant] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [currentItem, setCurrentItem] = useState(null);
//     const [showCategoryModal, setShowCategoryModal] = useState(false);
//     const [currentCategory, setCurrentCategory] = useState(null);
//     const [showRestaurantModal, setShowRestaurantModal] = useState(false);

//     const [updatedRestaurant, setUpdatedRestaurant] = useState({
//         restaurantName: '',
//         area: '',
//         city: '',
//         state: '',
//         pincode: '',
//         openingTime: '',
//         closingTime: '',
//         cuisineType: '',
//     });

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const loggedUserId = localStorage.getItem('userID');
//         setUserId(loggedUserId);

//         axios.get(`http://localhost:4050/restaurants/${id}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 setRestaurant(response.data);
//                 setUpdatedRestaurant(response.data); // Initialize update form with existing data
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, [id]);

//     const handleUpdateClick = (item) => {
//         setCurrentItem(item);
//         setShowModal(true);
//     };

//     const handleDeleteClick = (categoryId, itemId) => {
//         const token = localStorage.getItem('token');
//         axios.delete(`http://localhost:4050/restaurants/${id}/menu/${categoryId}/items/${itemId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 setRestaurant(response.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const handleModalSubmit = (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');

//         axios.put(`http://localhost:4050/restaurants/${id}/menu/${currentItem.categoryId}/items/${currentItem._id}`, currentItem, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 setRestaurant(response.data);
//                 setShowModal(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const handleUpdateCategoryClick = (category) => {
//         setCurrentCategory(category);
//         setShowCategoryModal(true);
//     };

//     const handleCategoryModalSubmit = (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');

//         axios.put(`http://localhost:4050/restaurants/${id}/menu/${currentCategory._id}`, currentCategory, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 setRestaurant(response.data);
//                 setShowCategoryModal(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const handleDeleteCategoryClick = (categoryId) => {
//         const token = localStorage.getItem('token');
//         axios.delete(`http://localhost:4050/restaurants/${id}/menu/${categoryId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 setRestaurant(response.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const handleUpdateRestaurant = () => {
//         setShowRestaurantModal(true);
//     };

//     const handleRestaurantModalSubmit = (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');

//         axios.put(`http://localhost:4050/restaurants/${id}`, updatedRestaurant, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 setRestaurant(response.data);
//                 setShowRestaurantModal(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     if (!restaurant) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="restaurant-details">
//             <h1>{restaurant.restaurantName}</h1>
//             <p>Location: {restaurant.area}, {restaurant.city}, {restaurant.state} - {restaurant.pincode}</p>
//             <p>Opening Time: {restaurant.openingTime}</p>
//             <p>Closing Time: {restaurant.closingTime}</p>
//             <p>Cuisine: {restaurant.cuisineType}</p>
//             <p>Location: <a href={restaurant.location} target="_blank" rel="noopener noreferrer">Google Maps Link</a></p>

//             <h3>Menu</h3>
//             {restaurant.menu.map((category, index) => (
//                 <div key={index} className="menu-category">
//                     <h4>{category.category}</h4>
//                     {category.items.map((item, idx) => (
//                         <div key={idx} className="menu-item">
//                             <p>{item.name} - ₹{item.price}</p>
//                             <p>{item.description}</p>

//                             {restaurant.owner === userId && (
//                                 <div className="item-actions">
//                                     <button onClick={() => handleUpdateClick(item)}>Update</button>
//                                     <button onClick={() => handleDeleteClick(category._id, item._id)}>Delete</button>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                     {restaurant.owner === userId && (
//                         <div className="category-actions">
//                             <button onClick={() => handleUpdateCategoryClick(category)}>Update Category</button>
//                             <button onClick={() => handleDeleteCategoryClick(category._id)}>Delete Category</button>
//                         </div>
//                     )}
//                 </div>
//             ))}

//             {restaurant.owner === userId && (
//                 <div className="update-restaurant">
//                     <button onClick={handleUpdateRestaurant}>Update Restaurant</button>
//                 </div>
//             )}

//             {/* Update Menu Item Modal */}
//             {showModal && currentItem && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Update Menu Item</h2>
//                         <form onSubmit={handleModalSubmit}>
//                             <div className="form-group">
//                                 <label>Name</label>
//                                 <input
//                                     type="text"
//                                     value={currentItem.name}
//                                     onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Price</label>
//                                 <input
//                                     type="number"
//                                     value={currentItem.price}
//                                     onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Description</label>
//                                 <textarea
//                                     value={currentItem.description}
//                                     onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
//                                 />
//                             </div>
//                             <button type="submit">Update</button>
//                             <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Update Category Modal */}
//             {showCategoryModal && currentCategory && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Update Category</h2>
//                         <form onSubmit={handleCategoryModalSubmit}>
//                             <div className="form-group">
//                                 <label>Category Name</label>
//                                 <input
//                                     type="text"
//                                     value={currentCategory.category}
//                                     onChange={(e) => setCurrentCategory({ ...currentCategory, category: e.target.value })}
//                                 />
//                             </div>
//                             <button type="submit">Update</button>
//                             <button type="button" onClick={() => setShowCategoryModal(false)}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Update Restaurant Modal */}
//             {showRestaurantModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Update Restaurant</h2>
//                         <form onSubmit={handleRestaurantModalSubmit}>
//                             <div className="form-group">
//                                 <label>Restaurant Name</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.restaurantName}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, restaurantName: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Area</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.area}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, area: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>City</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.city}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, city: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>State</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.state}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, state: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Pincode</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.pincode}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, pincode: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Opening Time</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.openingTime}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, openingTime: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Closing Time</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.closingTime}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, closingTime: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Cuisine Type</label>
//                                 <input
//                                     type="text"
//                                     value={updatedRestaurant.cuisineType}
//                                     onChange={(e) => setUpdatedRestaurant({ ...updatedRestaurant, cuisineType: e.target.value })}
//                                 />
//                             </div>
//                             <button type="submit">Update</button>
//                             <button type="button" onClick={() => setShowRestaurantModal(false)}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default RestaurantDetails;
