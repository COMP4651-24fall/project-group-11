
import "./Nav.css"
import React, { useContext, useEffect, useState } from 'react'
import { require } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LoginPage from './LoginPage';
import PurchasePage from './PurchasePage';

const Navbar = () => {
    const [text, setText] = useState();
    const [liopen, setLiopen] = useState(true);
    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }
    return (
        <header>
            <nav>

                
                    <div className="logo">
                        <img src={require("./web-app.jpg")} alt="logo" ></img>
                    </div>
                    <div className="searchbar" >

                        <input type="text" name=""
                            onChange={(e) => getText(e.target.value)}
                            placeholder="Search Your Products" class="searchbar" />
                        <div className="search_icon">
                            <SearchIcon />
                        </div>

                    </div>

                
            </nav>
        </header>

    );
};

export default Navbar;