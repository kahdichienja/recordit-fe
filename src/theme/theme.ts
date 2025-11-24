import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF8A80',
            light: '#ff756a',
            dark: '#e67872',
        },
        background: {
            default: '#0B0000',
            paper: '#0F0202',
        },
        text: {
            primary: '#ffffff',
            secondary: '#d1d5db',
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
                    boxShadow: '0 10px 40px rgba(255, 138, 128, 0.3)',
                    '&:hover': {
                        boxShadow: '0 15px 50px rgba(255, 138, 128, 0.4)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
