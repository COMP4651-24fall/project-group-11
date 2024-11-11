// PurchasePage.js
import React from "react";
import { useEffect, useState } from "react";
import "./purchasepage.css";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product_id }) => {
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/product/id/${product_id}`
        );
        if (!response.ok) {
          throw new Error("Unable to fetch product details");
        }
        const data = await response.json();
        setProductDetail(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetail();
  }, [product_id]);

  if (!productDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <img src={productDetail.image_url} alt="product" />
      <h2>{productDetail.title}</h2>
    </div>
  );
};

const PurchasePage = () => {
  // const user_id = 1; // hardcoded: need to change later
  const user_id = localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/cart/${user_id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response.status == 403) {
        navigate('/login')
      }
      if (!response.ok) {
        throw new Error("Failed to fetch cart details");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setItems([]);
      console.error("Error fetching cart details:", error);
    }
  };

  const sendOrder = async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${process.env.REACT_APP_API}/cart/${user_id}`);
      // if (!response.ok) {
      //     throw new Error('Failed to fetch product details');
      // }
      // const data = await response.json();
      // setItems(data);
    } catch (error) {
      console.error("Error sending order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      getCart();
    } catch (error) {
      setItems([]);
    }
  }, []);

  return (
    <>
      <div className="item-container">
        {items.map((item, index) => (
          <div key={index} className="item">
            <div className="detail">
              <ProductDetail product_id={item.product_id} />
            </div>
            <div className="quanity">
              <p>Product ID: {item.product_id}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order">
        <button onClick={sendOrder} disabled={loading}>
          {loading ? "Sending Order..." : "Confirm Buy"}
        </button>
      </div>
    </>
  );
};

export default PurchasePage;
