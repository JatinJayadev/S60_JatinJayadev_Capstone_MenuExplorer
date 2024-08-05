// import GoogleLogin from "./Components/Firebase/FirebaseLogin"
// import GoogleSignup from "./Components/Firebase/FirebaseSignup"
import Restuarants from "./Components/Restuarants"
import Login from "./Components/Login"
import RestaurantForm from "./Components/RestuarantForm"
import Signup from "./Components/SignUp"
import { Routes, Route } from "react-router-dom"
import RestuarantDetails from "./Components/RestuarantDetails"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Restuarants />} />
        <Route path="/addRestuarant" element={<RestaurantForm />} />
        <Route path="/restaurants/:id" element={<RestuarantDetails />} />
      </Routes>
      {/*
        <GoogleSignup />

        <Login />
        <GoogleLogin /> */}

    </div >
  )
}

export default App



// https://chatgpt.com/c/915724f3-bfc2-4061-9791-ea9c713ce4a4