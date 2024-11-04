
import "./Nav.css"
import React, { useContext, useEffect, useState } from 'react'
import { require } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import LoginPage from './LoginPage';
import PurchasePage from './PurchasePage';

const Navbar = () => {
    const [text, setText] = useState();
    const [liopen, setLiopen] = useState(true);
    const navigate = useNavigate();
    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }
    const handleClick = () => {
        // 👇️ navigate programmatically
        navigate('/purchase');
    };

    return (

        <header>
            <nav>


                <div className="logo">
                    <Link to="/"><img src={require("./web-app.jpg")} alt="logo" ></img></Link>
                </div>
                <div className="searchbar" >

                    <input type="text" name=""
                        onChange={(e) => getText(e.target.value)}
                        placeholder="Search Your Products" class="searchbar" />
                    <div className="search_icon">
                        <SearchIcon />
                    </div>

                </div>
                <div className="right">
                    <div className="nav_btn">
                        <Link to="/login">Sign In</Link>
                    </div>
                    <div className="shop_cart" >
                        <Link to="/purchase"><ShoppingCartIcon /></Link>
                    </div>
                </div>


            </nav>
            <Routes>
                <Route path="/" />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </header>


    );
};

export default Navbar;