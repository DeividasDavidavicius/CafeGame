import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { deleteInternetCafe, getInternetCafes } from "../../services/internetCafeService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useUser } from "../../contexts/UserContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


function InternetCafes() {
    const [internetCafesData, setInternetCafesData] = useState([]);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [currentCafe, setCurrentCafe] = useState({});
    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();
    const { isLoggedIn, role, accessToken, refreshToken, setLogin, setLogout } = useUser();

    const LoadEdit = (id) => {
        navigate("edit/" + id)
    }

    const handleOpenRemove = (cafe) => {
        setCurrentCafe(cafe);
        setOpenRemoveModal(true);
    };

    const handleCloseRemove = () => {
        setOpenRemoveModal(false);
        setCurrentCafe({});
    };

    const handleRemoveCafe = async () => {
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

        deleteInternetCafe(currentCafe.id);

        const updatedInternetCafes = internetCafesData.filter(
            (internetCafe) => internetCafe.id !== currentCafe.id
        );
        setInternetCafesData(updatedInternetCafes);
    }


    useEffect(() => {
        const getInternetCafesData = async () => {
            const result = await getInternetCafes();
            const sortedResult = [...result].sort((a, b) => a.id - b.id);
            setInternetCafesData(sortedResult);
        };

        getInternetCafesData();
    }, []);


    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Internet cafe list</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="create" className="btn btn-outline-dark" style={{ fontWeight: 'bold', color: '#67b5ba', border: '2px solid black' }}>Add internet cafe (+)</Link>
                    </div>
                    <div style={{ height: '10px' }} />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>ID</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Name</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Address</td>
                                <td style={{ backgroundColor: '#67b5ba', color: 'white' }}>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                internetCafesData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-outline-primary">Edit</a>
                                            <a onClick={() => { handleOpenRemove(item) }} className="btn btn-outline-danger">Remove</a>
                                            <a onClick={() => { handleOpenRemove(item) }} className="btn btn-outline-dark">Info</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog open={openRemoveModal} onClose={handleCloseRemove}>
                <DialogTitle>Do you really want to remove this cafe?</DialogTitle>
                <DialogContent>
                    <h6>Name: {currentCafe.name}</h6>
                    <h6>Address: {currentCafe.address}</h6>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleRemoveCafe} color="primary">
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

export default InternetCafes;
