import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0B0000', // Primary from user
            light: '#2D0A07', // Tertiary as light variant
            dark: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FF8A80', // Secondary from user
            light: '#ffbcaf',
            dark: '#c85a54',
            contrastText: '#000000',
        },
        error: {
            main: '#F40202', // Error from user
        },
        background: {
            default: '#0B0000', // Primary as background
            paper: '#1A0505', // Darkened Tertiary/Primary mix for cards/windows
        },
        text: {
            primary: '#ffffff', // onPrimary
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            '@media (min-width:600px)': {
                fontSize: '4.5rem',
            },
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.3,
            '@media (min-width:600px)': {
                fontSize: '3rem',
            },
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        body1: {
            fontSize: '1.125rem',
            color: '#d1d5db',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollBehavior: 'smooth',
                    overflowX: 'hidden',
                    backgroundColor: '#0B0000',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    padding: '0.75rem 2rem',
                },
                contained: {
                    backgroundColor: '#FF8A80',
                    color: '#000000',
                    boxShadow: '0 10px 40px rgba(255, 138, 128, 0.2)',
                    '&:hover': {
                        backgroundColor: '#ff9e96',
                        boxShadow: '0 15px 50px rgba(255, 138, 128, 0.3)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(26, 5, 5, 0.6)', // Semi-transparent paper color
                    backdropFilter: 'blur(40px)',
                    borderRadius: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.03)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(11, 0, 0, 0.8)',
                    backdropFilter: 'blur(40px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
});
