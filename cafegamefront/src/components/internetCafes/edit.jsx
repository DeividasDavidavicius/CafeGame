import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getInternetCafe, putInternetCafe } from "../../services/internetCafeService";
import { useUser } from "../../contexts/UserContext";
import SnackbarContext from "../../contexts/SnackbarContext";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";

function EditInternetCafe() {
    const { internetCafeId } = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();
    const { role, setLogin, setLogout } = useUser();
    const openSnackbar = useContext(SnackbarContext);

    useEffect(() => {
        if (!role.includes("Admin")) {
            openSnackbar('Only admins can edit internet cafes!', 'error');
            navigate('/');
        }

        const getInternetCafeData = async () => {
            try{
                const result = await getInternetCafe(internetCafeId);
                setName(result.name);
                setAddress(result.address);
            }
            catch
            {
                openSnackbar('This internet cafe does not exist!', 'error');
                navigate('/');
            }
        };

        getInternetCafeData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem('accessToken');
        if (!checkTokenValidity(accessToken)) {
            const result = await refreshAccessToken();
            if (!result.success) {
                openSnackbar('You need to login!', 'error');
                setLogout();
                navigate('/login');
                return;
            }

            setLogin(result.response.data.accessToken, result.response.data.refreshToken);
        }

        const postData = { name, address };
        setValidation(true);

        await putInternetCafe(postData, internetCafeId);

        openSnackbar('Internet cafe edited successfully!', 'success');
        navigate("/admin/internetCafes");
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
                                            <input value={name} onMouseDown={e => setValidation(true)} onChange={(e => setName(e.target.value))} required className="form-control"></input>
                                            {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input value={address} onMouseDown={e => setValidation(true)} onChange={(e => setAddress(e.target.value))} required className="form-control"></input>
                                            {address.length === 0 && validation && <span className="text-danger">Enter the address</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/admin/internetCafes" className="btn btn-danger">Back</Link>
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
