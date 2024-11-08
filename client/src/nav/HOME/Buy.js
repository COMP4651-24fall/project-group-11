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
        
                <div>
                    <p className="Square">The product ID is {prod.id}</p>
                    <img src={prod.url}/>
                </div>
          

    )
}

export default Productintro