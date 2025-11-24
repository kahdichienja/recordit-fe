import { Box, Container, Typography } from '@mui/material';

export const TermsApp = () => {
    return (
        <Box sx={{ p: 4, color: 'white' }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={800} mb={3}>Terms & Conditions</Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>Effective date: November 16, 2025</Typography>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>1. Agreement</Typography>
                    <Typography variant="body2" color="text.secondary">
                        By using RecordIt you agree to these terms.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>2. Services</Typography>
                    <Typography variant="body2" color="text.secondary">
                        RecordIt provides inventory and sales tracking tools.
                    </Typography>
                </Box>

                {/* ... more sections ... */}
            </Container>
        </Box>
    );
};
