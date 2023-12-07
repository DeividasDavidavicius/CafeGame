import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postInternetCafe } from '../../services/internetCafeService';

function CreateInternetCafe() {
    const [name, nameChange] = useState("");
    const [address, addressChange] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {name, address};

        await postInternetCafe(postData);

        navigate("/internetCafes");
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-title">
                                <h2>Create internet cafe</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input value={name} onChange={(e => nameChange(e.target.value))} required className="form-control"></input>
                                            {name.length == 0 && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input value={address} onChange={(e => addressChange(e.target.value))} required className="form-control"></input>
                                            {address.length == 0 && <span className="text-danger">Enter the address</span>}
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

export default CreateInternetCafe;
