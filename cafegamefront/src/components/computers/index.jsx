import { useContext, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import SnackbarContext from "../../contexts/SnackbarContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { deleteComputer, getComputers } from "../../services/computersService";
import { getInternetCafe } from "../../services/internetCafeService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";

function Computers() {
    const [computersData, setComputersData] = useState([]);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [currentInternetCafe, setCurrentInternetCafe] = useState({});
    const [currentComputer, setCurrentComputer] = useState({});
    const { internetCafeId } = useParams();

    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();
    const { role, setLogin, setLogout } = useUser();

    const LoadEdit = (id) => {
        navigate("edit/" + id)
    }

    const LoadReservations = (id) => {
        navigate(id+ "/computers")
    }

    const handleOpenRemove = (cafe) => {
        setCurrentComputer(cafe);
        setOpenRemoveModal(true);
    };

    const handleCloseRemove = () => {
        setOpenRemoveModal(false);
        setCurrentComputer({});
    };

    const handleRemoveComputer = async () => {
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

        deleteComputer(internetCafeId, currentComputer.id);
        openSnackbar('Computer deleted successfully!', 'success');

        const updatedComputers = computersData.filter(
            (computer) => computer.id !== currentComputer.id
        );
        setComputersData(updatedComputers);
        handleCloseRemove();
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
                getComputersData();
            }
            catch
            {
                openSnackbar('This internet cafe does not exist!', 'error');
                navigate('/');
            }
        };

        const getComputersData = async () => {
            const result = await getComputers(internetCafeId);
            const sortedResult = [...result].sort((a, b) => a.id - b.id);
            setComputersData(sortedResult);
        };

        getInternetCafeData();

    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>'{currentInternetCafe.name}' computer list</h2>
                </div>
                <div className="card-body">
                    <div>
                    <div className="divbtn">
                        <Link to="create" className="btn btn-outline-dark" style={{ fontWeight: 'bold', color: '#67b5ba', border: '2px solid black' }}>Add computer (+)</Link>
                    </div>
                    <div className="divbtn2">
                        <Link to="/admin/internetCafes" className="btn btn-outline-dark" style={{ fontWeight: 'bold', color: '#67b5ba', border: '2px solid black' }}>Back</Link>
                    </div>
                    </div>
                    <div style={{ height: '10px' }} />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>ID</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>RAM</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>CPU</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>GPU</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Monitor resolution</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Monitor refresh rate</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                computersData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.ram}</td>
                                        <td>{item.cpu}</td>
                                        <td>{item.gpu}</td>
                                        <td>{item.monitorResolution}</td>
                                        <td>{item.monitorRefreshRate}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-outline-primary">Edit</a>
                                            <a onClick={() => { handleOpenRemove(item) }} className="btn btn-outline-danger">Remove</a>
                                            <a onClick={() => { LoadReservations(item.id) }} className="btn btn-outline-dark">Info</a>
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
                    <Button onClick={handleRemoveComputer} color="primary">
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

export default Computers;
