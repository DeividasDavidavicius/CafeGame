import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { login } from "../../services/authentication";
import SnackbarContext from '../../contexts/SnackbarContext';

function Login() {
    const navigation = useNavigate();
    const { setLogin } = useUser();
    const [errorMessage, setErrorMessage] = useState(null);
    const openSnackbar = useContext(SnackbarContext);

    useEffect(()=> {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if(isLoggedIn === 'true')
        {
            openSnackbar('You have already logged in!', 'error');
            navigation('/');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const isValidUsername = (username) => {
            return username && username.length >= 5;
        }

        const isValidPassword = (password) => {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            return re.test(password);        }

        let errors = {};
        setValidationErrors(errors);
        if (!isValidUsername(username)) errors.username = "Username must be at least 5 characters long.";
        if (!isValidPassword(password)) errors.password = "Password must be at least 6 characters long, have a lowercase and uppercase letter, one number and symbol";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        tryLogin(username, password);
    };

    const tryLogin = async (username, password) => {
        try {
            const loginData = {username, password};
            const response = await login(loginData);

            if(response.status === 200) {
                setLogin(response.data.accessToken, response.data.refreshToken);
                navigation('/');
                openSnackbar('Succesfully logged in!', 'success');
            }
            else {
                const errorMessage = await response.text;
                console.log('Login failed:', errorMessage);
                setErrorMessage(errorMessage);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Failed to login, try again!");
        }
    }

    const [validationErrors, setValidationErrors] = useState({
        username: null,
        password: null
    });

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
                    <LockPersonTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {errorMessage &&
                    <Typography color="error">
                        {errorMessage}
                    </Typography>
                }
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} required>
                    <TextField
                        error={Boolean(validationErrors.username)}
                        helperText={validationErrors.username}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        error={Boolean(validationErrors.password)}
                        helperText={validationErrors.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
