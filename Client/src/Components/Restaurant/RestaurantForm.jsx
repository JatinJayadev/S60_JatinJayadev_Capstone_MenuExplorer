import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RestaurantForm.css';

const RestaurantForm = () => {
    const [step, setStep] = useState(1);
    const [restaurantName, setRestaurantName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [location, setLocation] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [menu, setMenu] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleAddCategory = () => setMenu([...menu, { category: '', items: [] }]);

    const handleCategoryChange = (index, value) => {
        const newMenu = [...menu];
        newMenu[index].category = value;
        setMenu(newMenu);
    };

    const handleAddItem = (index) => {
        const newMenu = [...menu];
        newMenu[index].items.push({ name: '', price: '', description: '' });
        setMenu(newMenu);
    };

    const handleItemChange = (catIndex, itemIndex, field, value) => {
        const newMenu = [...menu];
        newMenu[catIndex].items[itemIndex][field] = value;
        setMenu(newMenu);
    };

    const handleNext = () => {
        if (step === 1 && (restaurantName === '' || mobileNumber === '' || cuisineType === '' || imageUrl === '')) {
            alert('Please fill all the fields before proceeding to the next step');
            return;
        }
        if (step === 2 && (area === '' || city === '' || state === '' || pincode === '' || location === '' || openingTime === '' || closingTime === '')) {
            alert('Please fill all the fields before proceeding to the next step');
            return;
        }
        setStep(step + 1);
    };
    const handleBack = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const restaurantDetails = {
            restaurantName, mobileNumber, area, city, state, pincode, location, openingTime, closingTime, cuisineType, image: imageUrl, menu
        };

        axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/addRestaurant', restaurantDetails, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => {
                console.log(res)
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="restaurant-form">
                {step === 1 && (
                    <div className="step">
                        <h2 className="form-title">Step 1: Basic Details</h2>
                        <label className="form-label">Restaurant Name:
                            <input className="form-input" type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
                        </label>
                        <label className="form-label">Mobile Number:
                            <input className="form-input" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                        </label>
                        <label className="form-label">Cuisine Type:
                            <input className="form-input" type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} required />
                        </label>
                        <label className="form-label">Image URL: {/* New input for image URL */}
                            <input className="form-input" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                        </label>
                        <button type="button" className="next-button" onClick={handleNext}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="step">
                        <h2 className="form-title">Step 2: Location & Timings</h2>
                        <label className="form-label">Area:
                            <input className="form-input" type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
                        </label>
                        <label className="form-label">City:
                            <input className="form-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </label>
                        <label className="form-label">State:
                            <input className="form-input" type="text" value={state} onChange={(e) => setState(e.target.value)} required />
                        </label>
                        <label className="form-label">Pincode:
                            <input className="form-input" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                        </label>
                        <label className="form-label">Opening Time:
                            <input className="form-input" type="time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} required />
                        </label>
                        <label className="form-label">Closing Time:
                            <input className="form-input" type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} required />
                        </label>
                        <label className="form-label">Location (Google Maps link):
                            <input className="form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </label>
                        <button type="button" className="back-button" onClick={handleBack}>Back</button>
                        <button type="button" className="next-button" onClick={handleNext}>Next</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="step">
                        <h2 className="form-title">Step 3: Menu Details</h2>
                        {menu.map((category, catIndex) => (
                            <div key={catIndex} className="menu-category">
                                <label className="form-label">Category:
                                    <input className="form-input" type="text" value={category.category} onChange={(e) => handleCategoryChange(catIndex, e.target.value)} required />
                                </label>
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="menu-item">
                                        <label className="form-label">Menu Item Name:
                                            <input className="form-input" type="text" value={item.name} onChange={(e) => handleItemChange(catIndex, itemIndex, 'name', e.target.value)} required />
                                        </label>
                                        <label className="form-label">Price:
                                            <input className="form-input" type="number" value={item.price} onChange={(e) => handleItemChange(catIndex, itemIndex, 'price', e.target.value)} required />
                                        </label>
                                        <label className="form-label">Description:
                                            <input className="form-input" type="text" value={item.description} onChange={(e) => handleItemChange(catIndex, itemIndex, 'description', e.target.value)} required />
                                        </label>
                                    </div>
                                ))}
                                <button type="button" className="add-item-button" onClick={() => handleAddItem(catIndex)}>Add Item</button>
                            </div>
                        ))}
                        <button type="button" className="add-category-button" onClick={handleAddCategory}>Add Category</button>
                        <button type="button" className="back-button" onClick={handleBack}>Back</button>
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RestaurantForm;