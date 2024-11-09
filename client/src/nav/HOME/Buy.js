import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./buy.css";

const Productintro = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const getProductDetail = async () => {
    try {
        const response = await fetch(`http://localhost:8000/product/id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setItem(data);
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

return (
  <div className="detail">
    {item ? (
      <>
        <div className="right">
          <div className="test">
            <img src={item.image_url} style={{ margin: "0 auto" }} />
            <button>Add to cart</button>
          </div>
        </div>
        <div className="purchase">
          <p className="Title">{item.title}</p>
          <div className="Price">Cost: {item.price}</div>
          <div style={{ fontSize: "20px" }}> About the item:</div>
          <p className="description">
            {item.description}
          </p>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default Productintro;
