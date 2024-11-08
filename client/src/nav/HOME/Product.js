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

  const getProductDetail = () => {
    fetch("http://localhost:8000/product")
      .then((res) => res.json())
      .then((resJson) => {
        const data = resJson;
        setItems(data);
      });
  };
  useEffect(() => {
    getProductDetail();
    console.log("abc");
  }, []);
  return (
    <div className="products_section">
      <div className="head">
        <h3 style={{ fontSize: "30px" }}>Deal of the day</h3>
        <button className="all_btn" style={{ fontSize: "30px" }}>
          View All
        </button>
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
        {items.map((e) => {
          return (
            <NavLink to={`/product/${e.product_id}`} state={{ product: e }}>
              <div className="products_items">
                <div className="product_img">
                  <img src={e.image_url} alt="product" />
                </div>
                <p className="products_name">{e.title}</p>
              </div>
            </NavLink>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Product;
