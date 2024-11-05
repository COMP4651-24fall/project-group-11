import Carousel from 'react-material-ui-carousel'
import React from 'react'
import './Product.css'
import { Divider } from '@mui/material';
const Product = () => {
    return (
        
            <div>
                <div className='head'>
                    <h3 style={{ fontSize: "30px" }}>Product</h3>
                    <button className="all_btn" style={{ fontSize: "30px" }}>View All</button>
                </div>
                <Divider sx={{ bgcolor: "black" }}/>
                <div className='Product_detail'>HI</div>
            </div>
            
        
    )


}
export default Product;