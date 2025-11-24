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
                        RecordIt ("we", "our", "the App") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use RecordIt on mobile or web.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>2. Information We Collect</Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0, color: 'text.secondary', typography: 'body2' }}>
                        <li><strong>Account information:</strong> name, email, business name.</li>
                        <li><strong>Device & usage data:</strong> device type, OS, app version, actions within the app (inventory updates, sales logs) — used for analytics and improving the product.</li>
                        <li><strong>Optional data:</strong> product photos or files you upload.</li>
                    </Box>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>3. How We Use Data</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We use data to provide and improve the service, to sync and backup data, to send important account messages, and to detect and prevent fraud or abuse.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>4. Sharing & Disclosure</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We do not sell personal information. We may share data with trusted service providers (hosting, analytics) under contract and when required by law.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>5. Security</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We use industry-standard technical and organizational measures to protect user data. While we strive to protect your information, no system is completely secure.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>6. Offline & Sync</Typography>
                    <Typography variant="body2" color="text.secondary">
                        RecordIt supports offline usage and will sync data when an internet connection is available.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>7. Data Retention</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We retain data only as long as necessary to provide the service and to meet legal obligations.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>8. Your Rights</Typography>
                    <Typography variant="body2" color="text.secondary">
                        You may request access, correction, or deletion of your personal data by contacting us at <span style={{ color: '#FF8A80' }}>privacy@recordit.example</span>.
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>9. Contact</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Questions about this policy? Contact us at <span style={{ color: '#FF8A80' }}>uniminu36@gmail.com</span>.
                    </Typography>
                </Box>

                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 4, mt: 8, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        © 2025 RecordIt. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
