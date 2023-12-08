import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { useUser } from '../../contexts/UserContext';
import { checkTokenValidity, logout, refreshAccessToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";

function Register2() {
    const { isLoggedIn, role, setLogin, setLogout } = useUser();
    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');

        console.log(isLoggedIn);
        console.log(role);

        if(role.includes("Admin")) {
            console.log("includes");
        }

        if (!checkTokenValidity(accessToken)) {
            console.log("token invalid but refreshing");
            const result = await refreshAccessToken();
            if (!result.success) {
                setLogout();
                navigation('/');
                return;
            }

            console.log("result " + result.response.data.accessToken)
            setLogin(result.response.data.accessToken, result.response.data.refreshToken);
            console.log("token refreshed");
        }
        console.log("inbetween");

        try {
            console.log("try logout ngl mate");
            const response = await logout(localStorage.getItem('accessToken'));
            console.log("after trying to logout mate");
            console.log(response);
            if(response.status === 200)
            {
                setLogout(accessToken);
                navigation('/login');
            }
          } catch {

          }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
                    <VpnKeyTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" noValidate onSubmit={(event) => handleSubmit(event)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                //error={Boolean(validationErrors.username)}
                                //helperText={validationErrors.username}
                                required
                                fullWidth
                                id="userName"
                                label="Username"
                                name="userName"
                                autoComplete="userName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                //error={Boolean(validationErrors.email)}
                                //helperText={validationErrors.email}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                //error={Boolean(validationErrors.password)}
                                //helperText={validationErrors.password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Register2;
