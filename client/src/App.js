import { Suspense, lazy } from "react";
import './App.css';
import {  BrowserRouter,Route, Link, Routes, Router } from "react-router-dom";
import './nav/LoginPage.js'
import LoginPage from "./nav/LoginPage.js";
import PurchasePage from "./nav/PurchasePage.js";
import Navbar from './nav/NavBar';
import Home from "./nav/Home.js";
function App() {
  return (
    <body>
      <BrowserRouter>
      <Navbar/>
      <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/login" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
      
    </body>

  );
}
export default App;