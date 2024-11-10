import Carousel from "react-multi-carousel";
import React from "react";
import "./Product.css";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Product = () => {
  const [items, setItems] = useState([]);
  const [a, setA] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await fetch("http://localhost:8000/product");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setItems([]);
    }
  };

  useEffect(() => {
    try{
    getProductDetail();
    }catch(error){setItems([])}
  }, []);

  return (
    <div className="products_section">
      <div className="head">
        <h3 style={{ fontSize: "30px" }}>Deal of the day</h3>
        
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
        {items ? (
          items.map((e) => (
            <NavLink to={`/product/${e.product_id}`} state={{ product: e }} key={e.product_id}>
              <div className="products_items">
                <div className="product_img">
                  <img src={e.image_url} alt="product" />
                </div>
                <p className="products_name">{e.title}</p>
              </div>
            </NavLink>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Carousel>
    </div>
  );
};
export default Product;
