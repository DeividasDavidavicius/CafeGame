import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import RegisterIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { logout } from "../services/authentication";
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';

function Header() {
    const { isLoggedIn, role, accessToken, refreshToken, setLogout } = useUser();
    const navigation = useNavigate();

    const handleNavigation = (url) => {
        navigation(url);
    };

    let navOptions = [];

    if(isLoggedIn === true) {
        navOptions.push({ name: 'Your reservations', route: 'user/reservations' });

        if (role.includes('Admin')) {
            navOptions.push(
                { name: 'Manage restaurants', route: 'admin/restaurants' },
                { name: 'Manage tables', route: 'manage-tables' },
                { name: 'Manage reservations', route: 'manage-reservations' }
            );
        }

        navOptions.push({ name: 'Logout', route: '/', method: 'handleLogout' });
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function handleMenuItemClick(setting) {
        handleCloseUserMenu();
        if (setting.method) {
            if (setting.method === 'handleLogout') {
                handleLogout();
            }
        }
    }

    async function handleLogout() {
        try {
            await logout(accessToken);
            setLogout();
        } catch (error) {
            console.log(error.message);
        }
    }


    const pages = [
        { name: 'Internet cafes', route: 'internetCafes/' }
    ];

    const imageClick = [
        { name: 'Main', route: '/' }
    ]

    return (
        <AppBar position="static" style={{ backgroundColor: '#138c94' }} >
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <div onClick={() => handleNavigation(imageClick[0].route)} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer', pointerEvents: 'auto' }}>
                        <Link>
                            <Avatar sx={{ m: 1, bgcolor: 'error.light' }}>
                                <ImportantDevicesIcon />
                            </Avatar>
                        </Link>
                    </div>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={() => handleNavigation(page.route)}
                                    style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                                >
                                    <Link to={page.route} style={{ textDecoration: 'none', color: 'black' }}>
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <button
                                key={page.name}
                                onClick={() => handleNavigation(page.route)}
                                style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                            >
                                <MenuItem onClick={handleCloseNavMenu} style={{ pointerEvents: 'none' }}>
                                    <Link to={page.route} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            </button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn ?
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{ m: 1, bgcolor: '#508d91' }}>
                                            <SettingsIcon />
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {navOptions.map((setting) => (
                                        <MenuItem
                                            key={setting.name}
                                            onClick={() => {
                                                handleMenuItemClick(setting);
                                                handleNavigation(setting.route);
                                            }}
                                            style={{
                                                cursor: 'pointer',
                                                pointerEvents: 'auto',
                                            }}
                                        >
                                            <span style={{ textDecoration: 'none', color: 'black' }}>
                                                {setting.name}
                                            </span>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </> :
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Link to="/login">
                                        <Button startIcon={<LoginIcon />} sx={{ marginRight: 1, color: 'white' }}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button startIcon={<RegisterIcon />} sx={{ marginRight: 1, color: 'white' }}>
                                            Register
                                        </Button>
                                    </Link>
                                </Box>
                            </>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
