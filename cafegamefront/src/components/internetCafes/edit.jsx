import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getInternetCafe, putInternetCafe } from "../../services/internetCafeService";

function EditInternetCafe() {
    const {internetCafeId} = useParams();
    const [internetCafeData,  setInternetCafeData] = useState({});
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();


    useEffect(()=>{
        const getInternetCafesData = async () => {
            const result = await getInternetCafe(internetCafeId);
            setInternetCafeData(result);

            setName(result.name);
            setAddress(result.address);
        };

        getInternetCafesData();


    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {name, address};
        setValidation(true);

        await putInternetCafe(postData, internetCafeId);

        navigate("/internetCafes");
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-title">
                                <h2>Edit internet cafe {name}</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input value={name} onMouseDown={e=>setValidation(true)} onChange={(e => setName(e.target.value))} required className="form-control"></input>
                                            {name.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input value={address} onMouseDown={e=>setValidation(true)} onChange={(e => setAddress(e.target.value))} required className="form-control"></input>
                                            {address.length == 0 && validation && <span className="text-danger">Enter the address</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/internetCafes" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditInternetCafe;
