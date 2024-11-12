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
  const [totalPrice, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCartItems = async () => {
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
        throw new Error("Failed to fetch all cart items");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setItems([]);
      console.error("Error fetching cart items:", error);
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
      fetchCartItems();
    } catch (error) {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
      setPrice(totalPrice);
    } catch (error) {
      setItems([]);
    }
  }, [items]);

  return (
    <>
        <div className="heading">
            <h>Purchase Cart</h>
        </div>
        <div>
            {items ? (
                <div className="product-list">
                    {items.map((product) => (
                        <div key={product.product_id} className="product-item">
                            <img src={product.image_url} alt={product.title} className="product-image" />
                            <div className="product-details">
                                <h3>{product.title}</h3>
                                <p>Product ID: {product.product_id}</p>
                                <p>Type: {product.type}</p>
                                <p>Price: ${product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <div className="total-price">
                        <h3>Total Price: ${totalPrice}</h3>
                    </div>
                </div>
            ) : (
                <h>Your Cart is Empty</h>
            )}
            <div className="order">
                <button onClick={sendOrder} disabled={loading}>
                    {loading ? "Sending Order..." : "Confirm Buy"}
                </button>
            </div>
        </div>
    </>
  );
};

export default PurchasePage;