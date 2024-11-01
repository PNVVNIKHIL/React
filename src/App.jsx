// App.jsx
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Contactus from "./Contactus";
import Aboutus from "./Aboutus";
import Purchasehistory from "./Purchasehistory";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginComponent from "./FacebookLoginComponent";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <h2>Welcome, {userName}</h2>
      ) : (
        <div className="login-buttons">
          <GoogleOAuthProvider clientId="18946016391-i13ufu7kpceu80o0vv4eoilscosesv5v.apps.googleusercontent.com">
            <GoogleLoginComponent onLoginSuccess={handleLoginSuccess} />
          </GoogleOAuthProvider>
          <FacebookLoginComponent onLoginSuccess={handleLoginSuccess} />
        </div>
      )}

      <BrowserRouter>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/veg">Veg</Link>
          <Link to="/nonveg">NonVeg</Link>
          <Link to="/cart">Cart {totalItems}</Link>
          <Link to="/contactus">Contact Us</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/purchasehistory">Purchase History</Link>
        </div>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/purchasehistory" element={<Purchasehistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
