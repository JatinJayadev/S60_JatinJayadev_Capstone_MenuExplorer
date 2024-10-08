import { useState } from 'react';
import Restaurants from "./Components/Restaurant/Restaurants"
import Login from "./Components/Auth/Login"
import RestaurantForm from "./Components/Restaurant/RestaurantForm"
import Signup from "./Components/Auth/SignUp"
import { Routes, Route } from "react-router-dom"
import RestaurantDetails from "./Components/Restaurant/RestaurantDetails"
import ManageRestaurant from "./Components/Restaurant/ManageRestaurant"
import Navbar from "./Components/Navbar"

function App() {
  const [userProfileLink, setUserProfileLink] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userProfileLink={userProfileLink} />
      <Routes>
        <Route path="/login" element={<Login setUserProfileLink={setUserProfileLink} userProfileLink={userProfileLink} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Restaurants searchQuery={searchQuery} />} />
        <Route path="/addRestuarant" element={<RestaurantForm />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/manage-restaurants" element={<ManageRestaurant />} />
      </Routes>
    </div >
  )
}

export default App