import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

const defaultTheme = createTheme();

function Footer() {
    const containerStyles = {
        fontFamily: 'Space Mono, monospace',
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '10vh',
                }}
            >
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                </Box>
                <Box
                    component="footer"
                    sx={{
                        py: 1,
                        px: 1,
                        backgroundColor: defaultTheme.palette.grey[200],
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column', // Change to column layout
                        alignItems: 'center',
                        textAlign: 'center', // Center text
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontFamily: 'fantasy' }}>
                            <span style={{ marginRight: '8px' }}>
                                <img src="/assets/CafeGameLogo.svg" alt="CafeGame Logo" style={{ height: '24px' }} />
                            </span>
                            {'Copyright © CafeGame '}
                            {new Date().getFullYear()}
                            <span style={{ marginLeft: '8px' }}>
                                <img src="/assets/CafeGameLogo.svg" alt="CafeGame Logo" style={{ height: '24px' }} />
                            </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center" fontWeight="bold" sx={{ fontFamily: 'fantasy' }}>
                            Made by Deividas Davidavicius
                        </Typography>
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Footer;
