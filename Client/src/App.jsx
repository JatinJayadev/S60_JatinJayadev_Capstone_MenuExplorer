import Restuarants from "./Components/Restuarant/Restaurants"
import Login from "./Components/Auth/Login"
import RestaurantForm from "./Components/Restuarant/RestaurantForm"
import Signup from "./Components/Auth/Signup"
import { Routes, Route } from "react-router-dom"
import RestaurantDetails from "./Components/Restuarant/RestaurantDetails"
import ManageRestaurant from "./Components/Restuarant/ManageRestaurant"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Restuarants />} />
        <Route path="/addRestuarant" element={<RestaurantForm />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/manage-restaurants" element={<ManageRestaurant />} />
      </Routes>
    </div >
  )
}

export default App



// https://chatgpt.com/c/915724f3-bfc2-4061-9791-ea9c713ce4a4