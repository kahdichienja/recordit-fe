import { Box, Typography } from '@mui/material';
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
import {logo} from '../assets/index';   

export const Desktop = () => {
    const { windows } = useWindowManager();

    const apps = [
        {
            id: 'recordit',
            title: 'RecordIt',
            component: <RecordItApp />,
            icon: <img src={logo} alt="Logo"  height={30} width={30}/>
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
