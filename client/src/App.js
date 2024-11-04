import { Suspense, lazy } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './nav/LoginPage.js'
import LoginPage from "./nav/LoginPage.js";
import PurchasePage  from "./nav/PurchasePage.js";
import Navbar from './nav/NavBar';
function App() {
  return (
    <>
    
 
    <Navbar/>
    </>
  );
}
export default App;