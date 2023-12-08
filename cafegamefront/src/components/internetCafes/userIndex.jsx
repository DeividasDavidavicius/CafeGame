import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Grid, Card, CardContent, Typography } from '@mui/material';
import { getInternetCafes } from '../../services/internetCafeService';

const InternetCafesList = () => {
    const [internetCafesData, setInternetCafesData] = useState([]);

    useEffect(() => {
        const getInternetCafesData = async () => {
            const result = await getInternetCafes();
            const sortedResult = [...result].sort((a, b) => a.id - b.id);
            setInternetCafesData(sortedResult);
        };

        getInternetCafesData();
    }, []);



    const internetCafes = [
        { id: 1, name: 'Cafe 1', address: 'Address 1', imageUrl: '/path-to-image/cafe1.jpg' },
        { id: 2, name: 'Cafe 2', address: 'Address 2', imageUrl: '/path-to-image/cafe2.jpg' },
        { id: 3, name: 'Cafe 1', address: 'Address 1', imageUrl: '/path-to-image/cafe1.jpg' },
        { id: 4, name: 'Cafe 2', address: 'Address 2', imageUrl: '/path-to-image/cafe2.jpg' },
        { id: 5, name: 'Cafe 2', address: 'Address 2', imageUrl: '/path-to-image/cafe2.jpg' },
    ];

    return (
<div className="container">
  <div className="card">
    <div>
      <h1>Internet Cafes</h1>
      <div style={{ height: '30px' }} />
      <Grid container spacing={0}>
        {internetCafesData.map((cafe) => (
          <Grid key={cafe.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Link to={`/internet-cafe/${cafe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{
                  margin: '10px', // Adjust the margin as needed (half of the original spacing)
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
                    backgroundColor: 'transparent', // Set background color to transparent
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




    );
};

export default InternetCafesList;
