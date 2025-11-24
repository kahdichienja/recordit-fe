import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useWindowManager } from './context/WindowManager';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { RecordItApp } from './apps/RecordItApp';
import { PrivacyApp } from './apps/PrivacyApp';
import { TermsApp } from './apps/TermsApp';
import { AboutApp } from './apps/AboutApp';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import { logo } from '../assets/index';

const DesktopIcon = ({ app, openApp }: { app: any, openApp: any, index: number }) => {
    const [lastTap, setLastTap] = useState(0);

    const handleTap = () => {
        const now = Date.now();
        if (now - lastTap < 300) {
            openApp(app.id, app.title, app.component);
        }
        setLastTap(now);
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
                // position: 'absolute', // Handled by parent
                pointerEvents: 'auto',
                width: 80,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
            }}
            onTap={handleTap}
        >
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    p: 1,
                }}
            >
                {app.id === 'recordit' ? (
                    <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
                ) : (
                    app.icon
                )}
            </Box>
            <Typography
                variant="caption"
                sx={{
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    fontWeight: 600,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                }}
            >
                {app.title}
            </Typography>
        </motion.div>
    );
};

export const Desktop = () => {
    const { windows, openApp } = useWindowManager();

    const apps = [
        // ... (apps array remains the same)
        {
            id: 'recordit',
            title: 'RecordIt',
            component: <RecordItApp />,
            icon: <img src={logo} alt="Logo" height={30} width={30} />
        },
        {
            id: 'privacy',
            title: 'Privacy Policy',
            component: <PrivacyApp />,
            icon: <SecurityIcon sx={{ fontSize: 32, color: '#4FC3F7' }} />
        },
        {
            id: 'terms',
            title: 'Terms & Conditions',
            component: <TermsApp />,
            icon: <DescriptionIcon sx={{ fontSize: 32, color: '#AED581' }} />
        },
        {
            id: 'settings',
            title: 'Settings',
            component: <Box p={4}><Typography>Settings coming soon...</Typography></Box>,
            icon: <SettingsIcon sx={{ fontSize: 32, color: '#E0E0E0' }} />
        },
        {
            id: 'about',
            title: 'About RecordIt OS',
            component: <AboutApp />,
            icon: <InfoIcon sx={{ fontSize: 32, color: '#FFB74D' }} />
        }
    ];

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'background.default',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Luxurious Ambient Background */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    background: 'radial-gradient(circle at center, #1a0505 0%, #000000 100%)', // Lighter center
                    zIndex: 0,
                }}
            >
                {/* Deep Red Glow - Top Left */}
                <Box
                    component={motion.div}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5], // Increased opacity
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    sx={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-10%',
                        width: '70vw',
                        height: '70vw',
                        background: 'radial-gradient(circle, rgba(100, 20, 20, 0.6) 0%, rgba(0,0,0,0) 70%)', // Brighter red
                        filter: 'blur(80px)',
                    }}
                />

                {/* Coral/Orange Glow - Bottom Right */}
                <Box
                    component={motion.div}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3], // Increased opacity
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: '-20%',
                        right: '-10%',
                        width: '60vw',
                        height: '60vw',
                        background: 'radial-gradient(circle, rgba(255, 138, 128, 0.25) 0%, rgba(0,0,0,0) 70%)',
                        filter: 'blur(90px)',
                    }}
                />

                {/* Central Subtle Highlight */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100vw',
                        height: '100vh',
                        background: 'radial-gradient(circle at center, rgba(60, 10, 10, 0.3) 0%, rgba(0,0,0,0) 100%)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Decorative Circle Element (from reference) */}
                <Box
                    component={motion.div}
                    animate={{ opacity: [0.3, 0.6, 0.3] }} // Pulse opacity
                    transition={{ duration: 4, repeat: Infinity }}
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        right: '15%',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 138, 128, 0.5)', // More visible border
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(255, 138, 128, 0.1)',
                    }}
                >
                    <Box sx={{
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 138, 128, 0.3)',
                    }} />
                </Box>

                {/* Floating Widget: Inventory Analytics */}
                <Box
                    component={motion.div}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        right: '8%',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(255, 138, 128, 0.1)', color: '#FF8A80' }}>
                        <Inventory2Icon />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="white">Inventory Analytics</Typography>
                        <Typography variant="caption" color="rgba(255,255,255,0.6)">Level: Optimized</Typography>
                    </Box>
                </Box>

                {/* Floating Widget: Profit Margin */}
                <Box
                    component={motion.div}
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        right: '10%',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#66BB6A' }}>
                        <TrendingUpIcon />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="white">Profit Margin</Typography>
                        <Typography variant="caption" color="rgba(255,255,255,0.6)">+24% Growth</Typography>
                    </Box>
                </Box>

                {/* Floating Widget: Sales Velocity */}
                <Box
                    component={motion.div}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    sx={{
                        position: 'absolute',
                        top: '35%',
                        right: '35%',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(41, 182, 246, 0.1)', color: '#29B6F6' }}>
                        <SpeedIcon />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="white">Sales Velocity</Typography>
                        <Typography variant="caption" color="rgba(255,255,255,0.6)">High Demand</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Desktop Icons */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    top: 32, // Below MenuBar
                    zIndex: 1,
                    pointerEvents: 'none', // Allow clicking through empty space
                    p: 4,
                }}
            >
                {apps.filter(app => app.id === 'recordit' || app.id === 'about').map((app, index) => (
                    <Box onClick={() => openApp(app.id, app.title, app.component)}>
                        <DesktopIcon key={app.id} app={app} openApp={openApp} index={index} />
                    </Box>
                ))}
            </Box>

            <MenuBar />

            <Box sx={{ position: 'absolute', inset: 0, top: 32, bottom: 100, pointerEvents: 'none' }}>
                {windows.map((window) => (
                    <Box key={window.id} sx={{ pointerEvents: 'auto' }}>
                        <Window window={window} />
                    </Box>
                ))}
            </Box>

            <Dock apps={apps} />
        </Box>
    );
};
