import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { createSlice } from "@reduxjs/toolkit";
import "./buy.css";

// const initial = {
//   cartItems: [],
//   cartTotalQuantity: 0,
//   cartTotoalNumber: 0,
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initial,
//   reducers: {
//     addToCart(state, action) {
//       state.cartItems.push(action.payload);
//     },
//   },
// });

const Productintro = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const user_id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getProductDetail = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/product/id/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const addToCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, product_id: id }),
      });
      setMessage("Item added to cart successfully!");
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

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
    <div className="detail">
      {item ? (
        <>
          <div className="right">
            <div className="test">
              <img src={item.image_url} style={{ margin: "0 auto" }} />
              <button onClick={addToCart} disabled={loading}>
                {loading ? "Adding to Cart..." : "Add to Cart"}
              </button>
              {message && <div className="notification">{message}</div>}
            </div>
          </div>
          <div className="purchase">
            <p className="Title">{item.title}</p>
            <div className="Price">Cost: {item.price}</div>
            <div style={{ fontSize: "20px" }}> About the item:</div>
            <p className="description">{item.description}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Productintro;
