import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RestaurantForm = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [location, setLocation] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    // const [daysOfOperation, setDaysOfOperation] = useState(''); 
    const [cuisineType, setCuisineType] = useState('');
    const [image, setImage] = useState('');
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleAddCategory = () => {
        setMenu([...menu, { category: '', items: [] }]);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const restaurantDetails = {
            restaurantName, mobileNumber, area, city, state, pincode, location, openingTime, closingTime, cuisineType, image, menu, token
        };
        console.log(restaurantDetails);

        axios.post('http://localhost:4050/addRestaurant', restaurantDetails, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Restaurant Details</h2>

            <label>
                Restaurant Name:
                <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
            </label>

            <label>
                Mobile Number:
                <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
            </label>

            <label>
                Area:
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
            </label>

            <label>
                City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>

            <label>
                State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
            </label>

            <label>
                Pincode:
                <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required
                />
            </label>

            <label>
                Location (Google Maps link):
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </label>

            <label>
                Opening Time:
                <input type="time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} required />
            </label>

            <label>
                Closing Time:
                <input type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} required />
            </label>

            {/* <label>
                Days of Operation:
                <input type="text" value={daysOfOperation} onChange={(e) => setDaysOfOperation(e.target.value)} required placeholder="e.g., Mo,Tu,We,Th,Fr,Sa,Su" />
            </label> */}

            <label>
                Cuisine Type:
                <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} required />
            </label>

            <label>
                Restaurant Image URL:
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            </label>

            <h3>Menu Details</h3>
            {menu.map((category, catIndex) => (
                <div key={catIndex}>
                    <label>
                        Category:
                        <input
                            type="text"
                            value={category.category}
                            onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                            required
                        />
                    </label>
                    {category.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                            <label>
                                Menu Item Name:
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(catIndex, itemIndex, 'name', e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(catIndex, itemIndex, 'price', e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(catIndex, itemIndex, 'description', e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddItem(catIndex)}>
                        Add Item
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddCategory}>
                Add Category
            </button>
            <input type="submit" value="Submit Restaurant Details" />
        </form>
    );
};

export default RestaurantForm;

// import React, { useState } from 'react';

// const RestaurantForm = () => {
//     const [ownerName, setOwnerName] = useState('');
//     const [restaurantName, setRestaurantName] = useState('');
//     const [location, setLocation] = useState('');
//     const [contactNumber, setContactNumber] = useState('');
//     const [menuCategories, setMenuCategories] = useState([]);

//     const handleAddCategory = () => {
//         setMenuCategories([...menuCategories, { category: '', items: [] }]);
//     };

//     const handleCategoryChange = (index, value) => {
//         const newCategories = [...menuCategories];
//         newCategories[index].category = value;
//         setMenuCategories(newCategories);
//     };

//     const handleAddItem = (index) => {
//         const newCategories = [...menuCategories];
//         newCategories[index].items.push({ name: '', price: '', description: '' });
//         setMenuCategories(newCategories);
//     };

//     const handleItemChange = (catIndex, itemIndex, field, value) => {
//         const newCategories = [...menuCategories];
//         newCategories[catIndex].items[itemIndex][field] = value;
//         setMenuCategories(newCategories);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const restaurantDetails = {
//             ownerName,
//             restaurantName,
//             location,
//             contactNumber,
//             menuCategories,
//         };
//         console.log(restaurantDetails);
//         // Here you can handle the submission to your backend or API
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Owner and Restaurant Details</h2>
//             <label>
//                 Owner Name:
//                 <input
//                     type="text"
//                     value={ownerName}
//                     onChange={(e) => setOwnerName(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Restaurant Name:
//                 <input
//                     type="text"
//                     value={restaurantName}
//                     onChange={(e) => setRestaurantName(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Location:
//                 <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Contact Number:
//                 <input
//                     type="tel"
//                     value={contactNumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                     required
//                 />
//             </label>

//             <h3>Menu Details</h3>
//             {menuCategories.map((category, catIndex) => (
//                 <div key={catIndex}>
//                     <label>
//                         Category:
//                         <input
//                             type="text"
//                             value={category.category}
//                             onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
//                             required
//                         />
//                     </label>
//                     {category.items.map((item, itemIndex) => (
//                         <div key={itemIndex}>
//                             <label>
//                                 Menu Item Name:
//                                 <input
//                                     type="text"
//                                     value={item.name}
//                                     onChange={(e) => handleItemChange(catIndex, itemIndex, 'name', e.target.value)}
//                                     required
//                                 />
//                             </label>
//                             <label>
//                                 Price:
//                                 <input
//                                     type="number"
//                                     value={item.price}
//                                     onChange={(e) => handleItemChange(catIndex, itemIndex, 'price', e.target.value)}
//                                     required
//                                 />
//                             </label>
//                             <label>
//                                 Description:
//                                 <input
//                                     type="text"
//                                     value={item.description}
//                                     onChange={(e) => handleItemChange(catIndex, itemIndex, 'description', e.target.value)}
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     ))}
//                     <button type="button" onClick={() => handleAddItem(catIndex)}>
//                         Add Item
//                     </button>
//                 </div>
//             ))}
//             <button type="button" onClick={handleAddCategory}>
//                 Add Category
//             </button>
//             <input type="submit" value="Submit Restaurant Details" />
//         </form>
//     );
// };

// export default RestaurantForm;

// import React, { useState } from 'react';

// const RestaurantForm = () => {
//     const [restaurantName, setRestaurantName] = useState('');
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [area, setArea] = useState('');
//     const [location, setLocation] = useState('');
//     const [image, setImage] = useState('');
//     const [openingTime, setOpeningTime] = useState('');
//     const [closingTime, setClosingTime] = useState('');
//     const [menu, setMenu] = useState([]); // Updated to match the schema
//     const [verified, setVerified] = useState(false); // New state for verification

//     const handleAddCategory = () => {
//         setMenu([...menu, { category: '', items: [] }]);
//     };

//     const handleCategoryChange = (index, value) => {
//         const newMenu = [...menu];
//         newMenu[index].category = value;
//         setMenu(newMenu);
//     };

//     const handleAddItem = (index) => {
//         const newMenu = [...menu];
//         newMenu[index].items.push({ name: '', price: '', description: '' });
//         setMenu(newMenu);
//     };

//     const handleItemChange = (catIndex, itemIndex, field, value) => {
//         const newMenu = [...menu];
//         newMenu[catIndex].items[itemIndex][field] = value;
//         setMenu(newMenu);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const restaurantDetails = {
//             restaurantName,
//             mobileNumber,
//             area,
//             location,
//             image,
//             openingTime,
//             closingTime,
//             menu,
//             verified,
//         };
//         console.log(restaurantDetails);
//         // Here you can handle the submission to your backend or API
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Restaurant Details</h2>
//             <label>
//                 Restaurant Name:
//                 <input
//                     type="text"
//                     value={restaurantName}
//                     onChange={(e) => setRestaurantName(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Mobile Number:
//                 <input
//                     type="tel"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Area:
//                 <input
//                     type="text"
//                     value={area}
//                     onChange={(e) => setArea(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Location (Google Maps):
//                 <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Restaurant Image URL:
//                 <input
//                     type="text"
//                     value={image}
//                     onChange={(e) => setImage(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Opening Time:
//                 <input
//                     type="time"
//                     value={openingTime}
//                     onChange={(e) => setOpeningTime(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Closing Time:
//                 <input
//                     type="time"
//                     value={closingTime}
//                     onChange={(e) => setClosingTime(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Verified:
//                 <input
//                     type="checkbox"
//                     checked={verified}
//                     onChange={(e) => setVerified(e.target.checked)}
//                 />
//             </label>

//             <h3>Menu Details</h3>
//             {menu.map((category, catIndex) => (
//                 <div key={catIndex}>
//                     <label>
//                         Category:
//                         <input
//                             type="text"
//                             value={category.category}
//                             onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
//                             required
//                         />
//                     </label>
//                     {category.items.map((item, itemIndex) => (
//                         <div key={itemIndex}>
//                             <label>
//                                 Menu Item Name:
//                                 <input
//                                     type="text"
//                                     value={item.name}
//                                     onChange={(e) => handleItemChange(catIndex, itemIndex, 'name', e.target.value)}
//                                     required
//                                 />
//                             </label>
//                             <label>
//                                 Price:
//                                 <input
//                                     type="number"
//                                     value={item.price}
//                                     onChange={(e) => handleItemChange(catIndex, itemIndex, 'price', e.target.value)}
//                                     required
//                                 />
//                             </label>
//                             <label>
//                                 Description:
//                                 <input
//                                     type="text"
//                                     value={item.description}
//                                     onChange={(e) => handleItemChange(catIndex, itemIndex, 'description', e.target.value)}
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     ))}
//                     <button type="button" onClick={() => handleAddItem(catIndex)}>
//                         Add Item
//                     </button>
//                 </div>
//             ))}
//             <button type="button" onClick={handleAddCategory}>
//                 Add Category
//             </button>
//             <input type="submit" value="Submit Restaurant Details" />
//         </form>
//     );
// };

// export default RestaurantForm;