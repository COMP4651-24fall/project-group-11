
import "./Nav.css"
import React, { useState } from 'react'
import { require } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link} from "react-router-dom";


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
                        <Link to="/purchase"><ShoppingCartIcon sx={{ color: "white" }}/></Link>
                    </div>
                </div>


            </nav>
            
        </header>

       
    );
    
};

export default Navbar;