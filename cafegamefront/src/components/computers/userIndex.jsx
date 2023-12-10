import { Link, useNavigate, useParams } from "react-router-dom";
import { getInternetCafe } from "../../services/internetCafeService";
import { useContext, useEffect, useState } from "react";
import SnackbarContext from "../../contexts/SnackbarContext";
import { getComputers } from "../../services/computersService";
import { Button, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";

const ComputersList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentInternetCafe, setCurrentInternetCafe] = useState({});
    const [computersData, setComputersData] = useState([]);
    const { internetCafeId } = useParams();
    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        const getInternetCafeData = async () => {
            try {
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
        return () => clearTimeout(delay);
    }, []);

    return (
        <div>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="container">
                    <div className="card">
                        <div className="card-title">
                            <h2>'{currentInternetCafe.name}' computers</h2>
                        </div>
                        <Grid container spacing={0}>
                            {computersData.map((computer, index) => (
                                <Grid key={computer.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
                                    <Link to={`/internetCafes/${internetCafeId}/computers/${computer.id}/reservations`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card
                                            sx={{
                                                margin: '10px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {computer.id}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>RAM:</strong> {computer.ram}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>CPU:</strong> {computer.cpu}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>GPU:</strong> {computer.gpu}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Monitor Resolution:</strong> {computer.monitorResolution}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Monitor Refresh Rate:</strong> {computer.monitorRefreshRate}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        <div className="divbtn">
                            <Link to="/internetCafes" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#67b5ba', color: 'white', display: 'inline-block' }}>
                                    Back
                                </Button>
                            </Link>
                        </div >
                        <div style={{ marginBottom: '20px' }} />
                    </div>
                </div>
            )}
        </div>
    )
}

const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
};

const loadingTextStyle = {
    marginLeft: '8px', // Adjust as needed
    fontSize: '2rem',
    fontWeight: 'bold',
};

function LoadingPage() {
    return (
        <div style={loadingContainerStyle}>
            <CircularProgress size={35} thickness={8} style={{ color: '#138c94' }} />
            <span style={loadingTextStyle}>LOADING...</span>
        </div>
    );
}

export default ComputersList;
