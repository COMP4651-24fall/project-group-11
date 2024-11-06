import { useParams } from "react-router-dom";
import { products } from './prodcut_detail';
import { useEffect, useState } from "react";
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
        getProductDetail()
    }, [])
    const product = items.find(item => item.product_id === 1);
    return (

        <div>
            <p className="Square">The product ID is {product.product_id}</p>
            </div>
    )
}

export default Productintro