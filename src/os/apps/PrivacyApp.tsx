import { Box, Container, Typography } from '@mui/material';

export const PrivacyApp = () => {
    return (
        <Box sx={{ p: 4, color: 'white' }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={800} mb={3}>Privacy Policy</Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>Effective date: November 16, 2025</Typography>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>1. Introduction</Typography>
                    <Typography variant="body2" color="text.secondary">
                        RecordIt respects your privacy. This policy explains how we collect and use your data.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>2. Data Collection</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We collect account info, usage data, and optional uploads to provide our service.
                    </Typography>
                </Box>

                {/* ... more sections ... */}
            </Container>
        </Box>
    );
};
