import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { getInternetCafes } from '../../services/internetCafeService';

const InternetCafesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [internetCafesData, setInternetCafesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const getInternetCafesData = async () => {
      const result = await getInternetCafes();
      const sortedResult = [...result].sort((a, b) => a.id - b.id);
      setInternetCafesData(sortedResult);
    };

    getInternetCafesData();
    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="container">
          <div className="card">
            <div>
              <h1>Internet Cafes</h1>
              <div style={{ height: '30px' }} />
              <Grid container spacing={0}>
                {internetCafesData.map((cafe) => (
                  <Grid key={cafe.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Link to={`/internetCafes/${cafe.id}/computers`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card
                        sx={{
                          margin: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '70%',
                            height: 150,
                            margin: 'auto',
                            mt: 2,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: 'transparent',
                          }}
                        >
                          <img
                            src="/assets/CafeGameLogo.svg"
                            alt={`Avatar for ${cafe.name}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Avatar>
                        <CardContent>
                          <Typography variant="h6">{cafe.name}</Typography>
                          <Typography variant="body2">{cafe.address}</Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

export default InternetCafesList;
