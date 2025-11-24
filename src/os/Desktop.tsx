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
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { logo } from '../assets/index';

const DesktopIcon = ({ app, openApp, index }: { app: any, openApp: any, index: number }) => {
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
            initial={{ x: 20, y: 20 + (index * 100) }}
            style={{
                position: 'absolute',
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
            component: <Box p={4} textAlign="center"><Typography variant="h4">RecordIt OS v1.0</Typography><Typography color="text.secondary">macOS Tahoe Concept</Typography></Box>,
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
            {/* Ambient Background Gradient */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle at center, #2D0A07 0%, #0B0000 50%)',
                    opacity: 0.6,
                    pointerEvents: 'none',
                }}
            />

            {/* Desktop Icons */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    top: 32, // Below MenuBar
                    zIndex: 1,
                    pointerEvents: 'none', // Allow clicking through empty space
                }}
            >
                {apps.filter(app => app.id === 'recordit').map((app, index) => (
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
