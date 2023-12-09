import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import SnackbarContext from "../../contexts/SnackbarContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";
import { postComputer } from "../../services/computersService";

function CreateComputer() {
    const [ram, setRam] = useState("");
    const [cpu, setCpu] = useState("");
    const [gpu, setGpu] = useState("");
    const [monitorResolution, setMonitorResolution] = useState("");
    const [monitorRefreshRate, setMonitorRefreshRate] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, role, accessToken, refreshToken, setLogin, setLogout } = useUser();
    const openSnackbar = useContext(SnackbarContext);
    const { internetCafeId } = useParams();

    useEffect(() => {
        if (!role.includes("Admin")) {
            openSnackbar('Only admins can add computers!', 'error');
            navigate('/');
        }

        const getInternetCafeData = async () => {
            try{
                await getInternetCafe(internetCafeId);
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

        const postData = {ram, cpu, gpu, monitorResolution, monitorRefreshRate};

        await postComputer(postData, internetCafeId);

        openSnackbar('Computer created succesfully!', 'success');
        navigate(`/admin/internetCafes/${internetCafeId}/computers`);

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
                                            <label>RAM</label>
                                            <input value={ram} onChange={(e => setRam(e.target.value))} required className="form-control"></input>
                                            {ram.length == 0 && <span className="text-danger">Enter RAM</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>CPU</label>
                                            <input value={cpu} onChange={(e => setCpu(e.target.value))} required className="form-control"></input>
                                            {cpu.length == 0 && <span className="text-danger">Enter CPU</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>GPU</label>
                                            <input value={gpu} onChange={(e => setGpu(e.target.value))} required className="form-control"></input>
                                            {gpu.length == 0 && <span className="text-danger">Enter GPU</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Monitor resolution</label>
                                            <input value={monitorResolution} onChange={(e => setMonitorResolution(e.target.value))} required className="form-control"></input>
                                            {monitorResolution.length == 0 && <span className="text-danger">Enter monitor resolution</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Monitor refresh rate</label>
                                            <input value={monitorRefreshRate} onChange={(e => setMonitorRefreshRate(e.target.value))} required className="form-control"></input>
                                            {monitorRefreshRate.length == 0 && <span className="text-danger">Enter monitor refresh rate</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-outline-success" type="submit">Save</button>
                                            <Link to={`/admin/internetCafes/${internetCafeId}/computers`} className="btn btn-outline-danger">Back</Link>
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

export default CreateComputer;
