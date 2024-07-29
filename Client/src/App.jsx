import GoogleLogin from "./Components/Firebase/FirebaseLogin"
import GoogleSignup from "./Components/Firebase/FirebaseSignup"
import Login from "./Components/Login"
import Signup from "./Components/SignUp"

function App() {

  return (
    <div>
      <center>
        This web application designed to help users explore restaurant menus and discover dishes from various cuisines across India. Users can search for restaurants, browse menu items, view prices, and check availability. Restaurant owners can manage their menus, update item availability, and showcase their offerings to potential customers.
      </center>
      <div>
        <center>
          Website is still under development process................!
        </center>

        <Signup />
        <GoogleSignup />

        <Login />
        <GoogleLogin />
      </div>
    </div >
  )
}

export default App



// https://chatgpt.com/c/915724f3-bfc2-4061-9791-ea9c713ce4a4