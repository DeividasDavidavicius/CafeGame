import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useUser } from "../../contexts/UserContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { getComputer } from "../../services/computersService";
import { deleteReservation, getReservations, getUserReservations } from "../../services/reservationService";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";

function UserReservations() {
    const [reservationsData, setReservationsData] = useState([]);
    const [currentInternetCafe, setCurrentInternetCafe] = useState({});
    const [currentComputer, setCurrentComputer] = useState({});
    const [currentReservation, setCurrentReservation] = useState({});
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const { internetCafeId, computerId } = useParams();

    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();
    const { role, setLogin, setLogout, getUserId } = useUser();

    const LoadEdit = (internetCafeId, computerId, reservationId) => {
        navigate(`/internetCafes/${internetCafeId}/computers/${computerId}/reservations/edit/${reservationId}`)
    }

    const handleOpenRemove = (reservation) => {
        setCurrentReservation(reservation);
        setOpenRemoveModal(true);
    };

    const handleCloseRemove = () => {
        setOpenRemoveModal(false);
        setCurrentReservation({});
    };

    const handleRemoveReservation = async () => {
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

        deleteReservation(currentReservation.internetCafeId, currentReservation.computerId, currentReservation.id);
        openSnackbar('Reservation deleted successfully!', 'success');

        const updatedReservations = reservationsData.filter(
            (reservation) => reservation.id !== currentReservation.id
        );
        setReservationsData(updatedReservations);
        handleCloseRemove();
    }

    const formatDate = (date) => {
        const dateTime = new Date(date);
        const formattedDateTime = dateTime.toLocaleString();
        return formattedDateTime;
    }

    useEffect(() => {
        if (!role.includes("RegisteredUser")) {
            openSnackbar('Only registered users can access their reservations!', 'error');
            navigate('/');
        }

        const getReservationsData = async () => {
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

            const result = await getUserReservations();
            if (!result) {
                setReservationsData([])
            }
            else {
                const sortedResult = [...result].sort((a, b) => a.id - b.id);
                setReservationsData(sortedResult);
            }
        };

        getReservationsData();

    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>My reservations</h2>
                </div>
                {reservationsData.length > 0 &&
                    <div className="card-body">
                        <div style={{ height: '10px' }} />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>ID</td>
                                    <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Name</td>
                                    <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Start</td>
                                    <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>End</td>
                                    <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reservationsData.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{formatDate(item.start)}</td>
                                            <td>{formatDate(item.end)}</td>
                                            <td><a onClick={() => { LoadEdit(item.internetCafeId, item.computerId, item.id) }} className="btn btn-outline-primary">Edit</a>
                                                <a onClick={() => { handleOpenRemove(item) }} className="btn btn-outline-danger">Remove</a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>}
                {reservationsData.length == 0 && <div className="card-title">
                    <h5>You have no reservations</h5>
                </div>}
            </div>
            <Dialog open={openRemoveModal} onClose={handleCloseRemove}>
                <DialogTitle>Do you really want to remove '{currentReservation.name}' reservation?</DialogTitle>
                <DialogContent>
                    <h6>Start date: {formatDate(currentReservation.start)}</h6>
                    <h6>End date: {formatDate(currentReservation.end)}</h6>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleRemoveReservation} color="primary">
                        Remove reservation
                    </Button>
                    <Button onClick={handleCloseRemove} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserReservations;
