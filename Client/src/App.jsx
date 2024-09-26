import Restaurants from "./Components/Restaurant/Restaurants"
import Login from "./Components/Auth/Login"
import RestaurantForm from "./Components/Restaurant/RestaurantForm"
import Signup from "./Components/Auth/Signup"
import { Routes, Route } from "react-router-dom"
import RestaurantDetails from "./Components/Restaurant/RestaurantDetails"
import ManageRestaurant from "./Components/Restaurant/ManageRestaurant"
import Navbar from "./Components/Navbar"

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Restaurants />} />
        <Route path="/addRestuarant" element={<RestaurantForm />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/manage-restaurants" element={<ManageRestaurant />} />
      </Routes>
    </div >
  )
}

export default App



// https://chatgpt.com/c/915724f3-bfc2-4061-9791-ea9c713ce4a4