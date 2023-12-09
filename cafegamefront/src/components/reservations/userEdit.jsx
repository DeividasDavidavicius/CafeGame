import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import SnackbarContext from "../../contexts/SnackbarContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { getComputer } from "../../services/computersService";
import { getReservation, patchReservation } from "../../services/reservationService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";

function UserEditReservation() {
    const { internetCafeId, computerId, reservationId } = useParams();

    const [name, setName] = useState("");
    const [nameStatic, setNameStatic] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();
    const { role, setLogin, setLogout, getUserId } = useUser();
    const openSnackbar = useContext(SnackbarContext);

    const formatDate = (date) => {
        const dateTime = new Date(date);
        const formattedDateTime = dateTime.toLocaleString();
        return formattedDateTime;
    }

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

        const patchData = { name };
        setValidation(true);

        await patchReservation(patchData, internetCafeId, computerId, reservationId);

        openSnackbar('Reservation edited successfully!', 'success');
        navigate(`/user/reservations`);
    }

    useEffect(() => {
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
                await getComputer(internetCafeId, computerId);
                getReservationData();
            }
            catch
            {
                openSnackbar('This computer does not exist!', 'error');
                navigate('/');
            }
        };

        const getReservationData = async () => {
            try {
                const result = await getReservation(internetCafeId, computerId, reservationId);

                if (!(role.includes("RegisteredUser") && result.userId === getUserId()) && !role.includes("Admin")) {

                    openSnackbar('You can not edit this reservation', 'error');
                    navigate('/');
                }

                setName(result.name);
                setNameStatic(result.name);
                setStartDate(result.start);
                setEndDate(result.end);
            }
            catch
            {
                openSnackbar('This reservation does not exist!', 'error');
                navigate('/');
            }
        }

        getInternetCafeData();
    }, []);

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-title">
                                <h2>Edit reservation '{nameStatic}'</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input value={name} onMouseDown={e => setValidation(true)} onChange={(e => setName(e.target.value))} required className="form-control"></input>
                                            {name.length === 0 && validation && <span className="text-danger">Enter RAM</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Start date</label>
                                            <input
                                                value={formatDate(startDate)}
                                                readOnly
                                                className="form-control"
                                                style={{ backgroundColor: '#e0e8ec', color: 'black' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>End date</label>
                                            <input
                                                value={formatDate(endDate)}
                                                readOnly
                                                className="form-control"
                                                style={{ backgroundColor: '#e0e8ec', color: 'black' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-outline-success" type="submit">Save</button>
                                            <Link to={`/user/reservations`} className="btn btn-outline-danger">Back</Link>
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

export default UserEditReservation;
