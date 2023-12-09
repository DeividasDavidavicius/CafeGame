import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import SnackbarContext from "../../contexts/SnackbarContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { getComputer, putComputer } from "../../services/computersService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";

function EditComputer() {
    const { internetCafeId, computerId } = useParams();
    const [ram, setRam] = useState("");
    const [cpu, setCpu] = useState("");
    const [gpu, setGpu] = useState("");
    const [monitorResolution, setMonitorResolution] = useState("");
    const [monitorRefreshRate, setMonitorRefreshRate] = useState("");
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
            try {
                await getInternetCafe(internetCafeId);
                getComputerData();
            }
            catch
            {
                openSnackbar('This internet cafe does not exist!', 'error');
                navigate('/');
            }
        };

        const getComputerData = async () => {
            try {
                const result = await getComputer(internetCafeId, computerId);
                setRam(result.ram);
                setCpu(result.cpu);
                setGpu(result.gpu);
                setMonitorResolution(result.monitorResolution);
                setMonitorRefreshRate(result.monitorRefreshRate);
            }
            catch
            {
                openSnackbar('This computer does not exist!', 'error');
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

        const postData = { ram, cpu, gpu, monitorResolution, monitorRefreshRate };
        setValidation(true);

        await putComputer(postData, internetCafeId, computerId);

        openSnackbar('Computer edited successfully!', 'success');
        navigate(`/admin/internetCafes/${internetCafeId}/computers`);

    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-title">
                                <h2>Edit computer</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>RAM</label>
                                            <input value={ram} onMouseDown={e => setValidation(true)} onChange={(e => setRam(e.target.value))} required className="form-control"></input>
                                            {ram.length === 0 && validation && <span className="text-danger">Enter RAM</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>CPU</label>
                                            <input value={cpu} onMouseDown={e => setValidation(true)} onChange={(e => setCpu(e.target.value))} required className="form-control"></input>
                                            {cpu.length === 0 && validation && <span className="text-danger">Enter CPU</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>GPU</label>
                                            <input value={gpu} onMouseDown={e => setValidation(true)} onChange={(e => setGpu(e.target.value))} required className="form-control"></input>
                                            {gpu.length === 0 && validation && <span className="text-danger">Enter GPU</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Monitor resolution</label>
                                            <input value={monitorResolution} onMouseDown={e => setValidation(true)} onChange={(e => setMonitorResolution(e.target.value))} required className="form-control"></input>
                                            {monitorResolution.length === 0 && validation && <span className="text-danger">Enter monitor resolution</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Monitor refresh rate</label>
                                            <input value={monitorRefreshRate} onMouseDown={e => setValidation(true)} onChange={(e => setMonitorRefreshRate(e.target.value))} required className="form-control"></input>
                                            {monitorRefreshRate.length === 0 && validation && <span className="text-danger">Enter monitor refresh rate</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-outline-success" type="submit">Save</button>
                                            <Link to= {`/admin/internetCafes/${internetCafeId}/computers` } className="btn btn-outline-danger">Back</Link>
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

export default EditComputer;
