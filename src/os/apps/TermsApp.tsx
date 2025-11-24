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
                        By using RecordIt you agree to these Terms & Conditions. Please read them carefully.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>2. Services</Typography>
                    <Typography variant="body2" color="text.secondary">
                        RecordIt provides tools for inventory, sales tracking, and analytics. Features may change over time.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>3. Accounts</Typography>
                    <Typography variant="body2" color="text.secondary">
                        You are responsible for maintaining the confidentiality of account credentials and for all activity under your account.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>4. Paid Plans</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Paid subscriptions are billed as described on the pricing page. Refunds will be handled case-by-case.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>5. Acceptable Use</Typography>
                    <Typography variant="body2" color="text.secondary">
                        You must not use RecordIt for unlawful activities or misuse the platform. We reserve the right to suspend or terminate accounts violating these rules.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>6. Intellectual Property</Typography>
                    <Typography variant="body2" color="text.secondary">
                        All intellectual property rights in the service belong to RecordIt or its licensors. You may not reproduce or redistribute proprietary materials without permission.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>7. Limitation of Liability</Typography>
                    <Typography variant="body2" color="text.secondary">
                        To the maximum extent permitted by law, RecordIt is not liable for indirect or consequential damages arising from the use of the service.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>8. Termination</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We may suspend or terminate accounts for violations or at our discretion.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>9. Governing Law</Typography>
                    <Typography variant="body2" color="text.secondary">
                        These terms are governed by the laws of the applicable jurisdiction.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>10. Contact</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Questions about these terms? Contact <span style={{ color: '#FF8A80' }}>uniminu36@gmail.com</span>.
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={4}>
                    This is a starter Terms & Conditions document. Please consult legal counsel.
                </Typography>

                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 4, mt: 8, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        © 2025 RecordIt. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
