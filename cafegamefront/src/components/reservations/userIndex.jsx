import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useUser } from "../../contexts/UserContext";
import { getInternetCafe } from "../../services/internetCafeService";
import { getComputer } from "../../services/computersService";
import { getReservations } from "../../services/reservationService";
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';

function ReservationsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationsData, setReservationsData] = useState([]);
  const [currentInternetCafe, setCurrentInternetCafe] = useState({});
  const [currentComputer, setCurrentComputer] = useState({});
  const { internetCafeId, computerId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);

  const openSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { role, setLogin, setLogout } = useUser();

  const formatDate = (date) => {
    const dateTime = new Date(date);
    const offsetMinutes = dateTime.getTimezoneOffset();
    const utcTime = dateTime.getTime() + offsetMinutes * 60 * 1000;
    const utcDateTime = new Date(utcTime);
    const formattedDateTime = utcDateTime.toLocaleString();
    return formattedDateTime;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    getReservationsData(date);
  };

  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getReservationsData = async (selectedDate) => {
    const result = await getReservations(internetCafeId, computerId);

    let filteredResult = result;
    if (!isNaN(selectedDate.getTime())) {
      filteredResult = result.filter(reservation => {
        const formattedSelectedDate = formatDate2(selectedDate);
        const formattedReservationStart = formatDate2(new Date(reservation.start));
        return formattedReservationStart === formattedSelectedDate;
      });
    }

    const sortedResult = [...filteredResult].sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

    setReservationsData(sortedResult);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const getInternetCafeData = async () => {
      try {
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
      try {
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

      const sortedResult = [...result].sort((a, b) => {
        const dateA = new Date(a.start);
        const dateB = new Date(b.start);

        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

      setReservationsData(sortedResult);
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
              <h2>'{currentInternetCafe.name}' computer '{computerId}' reservations</h2>
            </div>
            {role.includes("RegisteredUser") &&
              <div className="divbtn">
                <Link to={`create`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                  <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#67b5ba', color: 'white', display: 'inline-block' }}>
                    Create Reservation
                  </Button>
                </Link>
              </div >
            }
            <div style={{ height: '20px' }} />

            <TextField
              type="date"
              label="Select Date"
              value={selectedDate ? formatDate2(selectedDate) : ''}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              InputLabelProps={{ shrink: true }}
              style={{ width: '45%', margin: 'auto', marginBottom: '10px' }}
            />

            <Grid container spacing={0}>
              {reservationsData.map((reservation, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
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
                        {reservation.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Start Date:</strong> {formatDate(reservation.start)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>End Date:</strong> {formatDate(reservation.end)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <div className="divbtn">
              <Link to={`/internetCafes/${internetCafeId}/computers`} style={{ textDecoration: 'none', display: 'inline-block' }}>
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
  );
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

export default ReservationsList;
