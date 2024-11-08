
import './App.css';
import {  BrowserRouter,Route, Routes, } from "react-router-dom";
import './nav/LoginPage.js'
import LoginPage from "./nav/LoginPage.js";
import PurchasePage from "./nav/PurchasePage.js";
import Navbar from './nav/NavBar';
import Home from "./nav/Home.js";
import Register from "./nav/register.js";
import Productintro from "./nav/HOME/Buy.js";

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