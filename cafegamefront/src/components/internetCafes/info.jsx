import { useParams } from "react-router-dom";


function InfoInternetCafe() {

    const { internetCafeId } = useParams();
    console.log(internetCafeId)
    return (
        <div></div>
    );
}

export default InfoInternetCafe;
