import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Privacy Policy', path: '/policy' },
    { label: 'Terms and Conditions', path: '/terms' },
];

export const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="fixed" elevation={0}>
            <Toolbar sx={{ py: 1, px: { xs: 2, md: 7 } }}>
                {/* Logo */}
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <Box
                        component="img"
                        src="https://i.ibb.co/JRJXGKDR/cropped-circle-image.png"
                        alt="RecordIt Logo"
                        sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
                        RecordIt
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Desktop Navigation */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.path}
                                component={RouterLink}
                                to={link.path}
                                sx={{
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={toggleDrawer(true)}
                        sx={{ ml: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Mobile Drawer */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: 280,
                            backgroundColor: 'background.default',
                            backgroundImage: 'none',
                        },
                    }}
                >
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={toggleDrawer(false)} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.path} disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to={link.path}
                                    onClick={toggleDrawer(false)}
                                    sx={{
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};
