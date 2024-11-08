import { useParams } from "react-router-dom";
import { products } from './prodcut_detail';
import { useEffect, useState } from "react";
import './buy.css'
const Productintro = () => {
    const params = useParams()
    const [items, setItems] = useState([])
    const getProductDetail = () => {
        fetch("http://localhost:8000/product")
            .then(res => res.json())
            .then((resJson) => {
                const data = resJson
                setItems(data)
            }

            )


    }
    useEffect(() => {

    }, [])
    //const product = items.find(item => item.product_id === 1);
    const ID = params.id
    const prod = products.find(i => i.id == ID)
    console.log(ID)
    return (
        <div className="detail">
            <div right>


                <div className="test">
                    <img src={prod.url} style={{ margin: "0 auto" }} />
                    <button>Add to cart</button>
                </div>
            </div>
            <div className="purchase">
                <p className="Title">{prod.title.longTitle}</p>
                <div className="Price">Cost: {prod.price.cost}</div>
                <div style={{fontSize:"20px"}}>About the item:</div>
                <p className="description">
                    
                    <div>{prod.description}</div>
                </p>
            </div>
        </div>
    )
}

export default Productintro