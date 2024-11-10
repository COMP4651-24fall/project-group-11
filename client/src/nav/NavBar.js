
import "./Nav.css"
import React, { useState, useEffect } from 'react'
import { require } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { SearchList } from "./filter_result.js";

const Navbar = () => {
    const [list, setlist] = useState();
    const [items, setItems] = useState([])

    const [liopen, setLiopen] = useState(true);

    const applyFilter = (searchTerm) => {
        if (searchTerm != "") {
            const filtered = items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setlist(filtered);
        } else {
            setlist([]);
        }
    };
    
    const getProductDetail = async () => {
        try {
            const response = await fetch("http://localhost:8000/product");
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            } else {
                throw new Error('Failed to fetch product details');
            }
        } catch (error) {
            setItems([])
            console.error(error);
        }
    };
    
    useEffect(() => {
        getProductDetail();
    }, [])

    return (
        <header>
            <div className="overallbar">
                <nav>
                    <div className="logo">
                        <Link to="/"><img src={require("./resources/home-icon.png")} alt="logo" ></img></Link>
                    </div>
                    <div className="searchbar" >
                        <input type="text" name=""
                            onChange={(e) => applyFilter(e.target.value)}
                            placeholder="Search Your Products" className="searchbar" />
                        <div className="search_icon">
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="right">
                        <div className="nav_btn">
                            <Link to="/login">Sign In</Link>
                        </div>
                        <div className="shop_cart" >
                            <Link to="/purchase"><ShoppingCartIcon sx={{ color: "white" }} /></Link>
                        </div>
                    </div>
                </nav>
                <div className="list">
                    <SearchList results={list} />
                </div>
            </div>
        </header>
    );
};
export default Navbar;