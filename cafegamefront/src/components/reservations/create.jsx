import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import SnackbarContext from "../../contexts/SnackbarContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { getComputer } from "../../services/computersService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";
import { postReservation } from "../../services/reservationService";

function CreateReservation() {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, role, accessToken, refreshToken, setLogin, setLogout } = useUser();
    const openSnackbar = useContext(SnackbarContext);
    const { internetCafeId, computerId } = useParams();

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const areDatesValid = () => {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        return (
            startDateTime.toISOString().slice(0, 10) === endDateTime.toISOString().slice(0, 10)
        );
    }; //            startDateTime < endDateTime

    const areDatesValid2 = () => {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        return (
            startDateTime < endDateTime
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!areDatesValid()) {
            openSnackbar("Start and end dates must be in the same day!", "error")
            return;
        }

        if (!areDatesValid2()) {
            openSnackbar("Start date must be older than end date!", "error")
            return;
        }

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

        const postData = {name, startDate, endDate};

        try {
            await postReservation(postData, internetCafeId, computerId);
        } catch(error) {
            console.log(postData);
            console.log(error.response.data.errorMessage);
        }

        console.log(postData);
    }

    useEffect(() => {
        if (!role.includes("Admin")) {
            openSnackbar('You can not access admin functions!!', 'error');
            navigate('/');
        }

        const getInternetCafeData = async () => {
            try{
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
            try{
                await getComputer(internetCafeId, computerId);
            }
            catch
            {
                openSnackbar('This computer does not exist!', 'error');
                navigate('/');
            }
        };

        getInternetCafeData();
    }, []);

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
                                            <input value={name} onChange={(e => setName(e.target.value))} required className="form-control"></input>
                                            {name.length == 0 && <span className="text-danger">Enter name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input
                                                type="datetime-local"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required
                                                className="form-control"
                                                min={getCurrentDateTime()}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input
                                                type="datetime-local"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                required
                                                className="form-control"
                                                min={getCurrentDateTime()}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-outline-success" type="submit">Save</button>
                                            <Link to={`/admin/internetCafes/${internetCafeId}/computers/${computerId}/reservations`} className="btn btn-outline-danger">Back</Link>
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

export default CreateReservation;
