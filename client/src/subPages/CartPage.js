import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------
import "./subPages_CSS/CartPage.css";

const PurchasePage = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [totalPrice, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem("userId");
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
    if (items.length === 0) {
      setMessage("Your Cart is Empty!");
      return;
    }
    try {
      setLoading(true);
      const response_sendOrder = await fetch(`${process.env.REACT_APP_API}/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, total_price: totalPrice}),
      });
      if (response_sendOrder.ok) {
        const data = await response_sendOrder.json();
        if (data && data.order_id !== null) {
          const order_id = data.order_id;
          const orderItemsValues = items.map(product => [order_id, product.product_id, product.quantity]);
          const response_sendOrderItems = await fetch(`${process.env.REACT_APP_API}/order/add-order-items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ orderItemsValues }),
          });
        }
      }
      const response_deleteCart = await fetch(`${process.env.REACT_APP_API}/cart/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
      });
      setItems([]);
      setMessage("Order sent successfully!");
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
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
      setPrice(null);
    }
  }, [items]);

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {message && <div className="notification">{message}</div>}
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