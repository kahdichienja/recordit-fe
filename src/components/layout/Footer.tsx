import { Box, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                © 2025 RecordIt. All rights reserved.
            </Typography>
        </Box>
    );
};
