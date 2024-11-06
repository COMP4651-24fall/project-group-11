import Carousel from 'react-multi-carousel'
import React from 'react'
import './Product.css'
import { products } from './prodcut_detail';
import 'react-multi-carousel/lib/styles.css';
import { Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
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
                
               
                centerMode={true}
                
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
                            <NavLink to={`/product/${e.id}`}>
                            <div className="products_items">
                                <div className="product_img">
                                    <img src={e.url} alt="product" />
                                </div>
                                <p className="products_name">{e.title.shortTitle}</p>
                                <p className="products_offer" style={{ color: "#  007185" }}>{e.discount}</p>
                                <p className="products_explore">{e.tagline}</p>
                            </div>
                            </NavLink>
                        )
                    })
                }

            </Carousel>
        </div>


    )


}
export default Product;