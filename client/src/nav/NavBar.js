
import "./Nav.css"
import React, { useState } from 'react'
import { require } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { products } from "./HOME/prodcut_detail.js"
import { SearchList } from "./filter_result.js";
import { Divider } from '@mui/material';
const Navbar = () => {

    const [list, setlist] = useState();
    const [liopen, setLiopen] = useState(true);


    const handlechange = (value) => {
        if (value !== "") {
            const result = products.filter(item => item.id.includes(value))
            result.map((e) => { return (console.log(e.id)) })
            setlist(result)
        }
        else {
            setlist([])
        }
    }

    return (

        <header>
            <div className="overallbar">
                <nav>
                    <div className="logo">
                        <Link to="/"><img src={require("./web-app.jpg")} alt="logo" ></img></Link>
                    </div>

                    <div className="searchbar" >

                        <input type="text" name=""
                            onChange={(e) => handlechange(e.target.value)}
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