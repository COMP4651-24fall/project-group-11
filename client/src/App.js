import {  BrowserRouter,Route, Routes, } from "react-router-dom";
// ----------------------------------------------------------------
import './main_CSS/App.css';
import Navbar from './subPages/NavBar.js';
import Home from "./subPages/Home.js";
import PurchasePage from "./subPages/CartPage.js";
import LoginPage from "./subPages/LoginPage.js";
import Register from "./subPages/Register.js";
import Productintro from "./subPages/ProductDetail.js";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<Productintro />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;