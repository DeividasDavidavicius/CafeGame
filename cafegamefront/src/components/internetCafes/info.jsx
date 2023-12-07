import { useParams } from "react-router-dom";


function InfoInternetCafe() {

    const { internetCafeId } = useParams();
    console.log(internetCafeId)
    return (
        <div><p>wasd123</p></div>
    );
}

export default InfoInternetCafe;
