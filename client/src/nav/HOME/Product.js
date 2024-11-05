import Carousel from 'react-material-ui-carousel'
import React from 'react'
import './Product.css'
import { products } from './prodcut_detail';
import { Divider } from '@mui/material';
import { NavLink } from "react-router-dom";

const responsive = {
    desktop: {
        breakpoint: { max: 1000, min: 900 },
        items: 3,
        slideToSlide:3
    }
};
const Product = () => {
    return (

        <div className='products_section'>
            <div className='head'>
                <h3 style={{ fontSize: "30px" }}>Deal of the day</h3>
                <button className="all_btn" style={{ fontSize: "30px" }}>View All</button>
            </div>
            <Divider sx={{ bgcolor: "black" }} />
            <Carousel
                responsive={responsive}
                infinite={true}
                draggable={true}
                swipeable={true}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                showDots={false}
                navButtonsAlwaysVisible={true}
                dotListClass="custom-dot-list-style"
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
                
            >
                {
                    products.map((e) => {
                        return (
                            
                                <div className="products_items">
                                    <div className="product_img">
                                        <img src={e.url} alt="product" />
                                    </div>
                                    <p className="products_name">{e.title.shortTitle}</p>
                                    <p className="products_offer" style={{ color: "#  007185" }}>{e.discount}</p>
                                </div>
                                
                            
                        )
                    })
                }

            </Carousel>
        </div>


    )


}
export default Product;