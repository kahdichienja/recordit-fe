import { Box, Typography, IconButton } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SearchIcon from '@mui/icons-material/Search';
import ControlCenterIcon from '@mui/icons-material/Tune'; // Placeholder for Control Center
import { useState, useEffect } from 'react';

export const MenuBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Box
            sx={{
                height: 32,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 10000,
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 500,
                userSelect: 'none',
            }}
        >
            {/* Left Side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <IconButton size="small" sx={{ color: 'white', p: 0 }}>
                    <AppleIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" fontWeight={700}>RecordIt POS</Typography>

            </Box>

            {/* Right Side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
                    <BatteryFullIcon fontSize="small" />
                    <WifiIcon fontSize="small" />
                </Box>
                <Typography variant="body2" fontWeight={600}>
                    {formatDate(time)}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {formatTime(time)}
                </Typography>
            </Box>
        </Box>
    );
};
