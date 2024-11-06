import { useParams } from "react-router-dom";

const Productintro = () => {
    const params = useParams()
    return(
        <p className="Square">The product ID is {params.id}</p>
    )
}

export default Productintro