import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useUser } from "../../contexts/UserContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { getComputer } from "../../services/computersService";
import { getReservations } from "../../services/reservationService";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function Reservations()
{
    const [reservationsData, setReservationsData] = useState([]);
    const [currentInternetCafe, setCurrentInternetCafe] = useState({});
    const [currentComputer, setCurrentComputer] = useState({});
    const [currentReservation, setCurrentReservation] = useState({});
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const { internetCafeId, computerId } = useParams();

    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();
    const { role, setLogin, setLogout } = useUser();

    const LoadEdit = (id) => {
        navigate("edit/" + id)
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
    }

    const formatDate = (date) => {
        const dateTime = new Date(date);
        const formattedDateTime = dateTime.toLocaleString();
        return formattedDateTime;
    }

    useEffect(() => {
        if (!role.includes("Admin")) {
            openSnackbar('Only admins can see admin menu!', 'error');
            navigate('/');
        }

        const getInternetCafeData = async () => {
            try{
                const result = await getInternetCafe(internetCafeId);
                setCurrentInternetCafe(result);

                getComputerData();
            }
            catch
            {
                openSnackbar('This internet cafe does not exist!', 'error');
                navigate('/');
            }
        };

        const getComputerData = async () => {
            try
            {
                const result = await getComputer(internetCafeId, computerId);
                setCurrentComputer(result);

                getReservationsData();
            }
            catch
            {
                openSnackbar('This computer does not exist!', 'error');
                navigate('/');
            };
        };

        const getReservationsData = async () => {
            const result = await getReservations(internetCafeId, computerId);
            const sortedResult = [...result].sort((a, b) => a.id - b.id);
            setReservationsData(sortedResult);
        };

        getInternetCafeData();

    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>'{currentInternetCafe.name}' computer '{computerId}' reservations</h2>
                </div>
                <div className="card-body">
                    <div>
                    <div className="divbtn">
                        <Link to="create" className="btn btn-outline-dark" style={{ fontWeight: 'bold', color: '#67b5ba', border: '2px solid black' }}>Add reservation (+)</Link>
                    </div>
                    <div className="divbtn2">
                        <Link to={`/admin/internetCafes/${internetCafeId}/computers`} className="btn btn-outline-dark" style={{ fontWeight: 'bold', color: '#67b5ba', border: '2px solid black' }}>Back</Link>
                    </div>
                    </div>
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
                                        <td>{ formatDate(item.start) }</td>
                                        <td>{ formatDate(item.end) }</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-outline-primary">Edit</a>
                                            <a onClick={() => { handleOpenRemove(item) }} className="btn btn-outline-danger">Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog open={openRemoveModal} onClose={handleCloseRemove}>
                <DialogTitle>Do you really want to remove this computer?</DialogTitle>
                <DialogContent>
                    <h6>RAM: {currentComputer.ram}</h6>
                    <h6>CPU: {currentComputer.cpu}</h6>
                    <h6>GPU: {currentComputer.gpu}</h6>
                    <h6>Monitor resolution: {currentComputer.monitorResolution}</h6>
                    <h6>Monitor refresh rate: {currentComputer.monitorRefreshRate}</h6>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleRemoveReservation} color="primary">
                        Remove Internet cafe
                    </Button>
                    <Button onClick={handleCloseRemove} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Reservations;
