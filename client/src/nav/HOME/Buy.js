import { useParams } from "react-router-dom";
import { products } from './prodcut_detail';
const Productintro = () => {
    const params = useParams()
    return(
        <div>
        <p className="Square">The product ID is {params.id}</p>
        <div>The product name is</div></div>
    )
}

export default Productintro