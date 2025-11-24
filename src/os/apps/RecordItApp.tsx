import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';

// Reusing the content from the previous Home.tsx but adapted for a window
// We remove the fixed full-screen backgrounds and use the window's container
export const RecordItApp = () => {
    return (
        <Box sx={{ pb: 8, color: 'white' }}>
            {/* HERO SECTION */}
            <Box
                sx={{
                    pt: 8,
                    pb: 10,
                    px: 4,
                    background: 'linear-gradient(135deg, #2D0A07 0%, #0B0000 100%)',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                    Inventory & Sales
                    <br />
                    <span style={{ color: '#FF8A80' }}>Analytics Reinvented.</span>
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', color: 'text.secondary' }}>
                    Track stock, manage sales, and uncover insights with a powerful, fast, and modern system.
                </Typography>
                <Button variant="contained" size="large" sx={{ borderRadius: '12px', color: 'black' }}>
                    Get Started
                </Button>
            </Box>

            {/* FEATURES */}
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Typography variant="h4" textAlign="center" mb={6} fontWeight={700}>
                    Why RecordIt?
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { title: 'Inventory Tracking', desc: 'Update and monitor stock levels instantly.' },
                        { title: 'Smart Sales', desc: 'Track daily sales and performance in real time.' },
                        { title: 'Analytics', desc: 'Visual dashboards help you make smarter decisions.' },
                    ].map((item, i) => (
                        <Grid key={i}>
                            <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>{item.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* PRICING */}
            <Container maxWidth="lg" sx={{ mt: 10 }}>
                <Typography variant="h4" textAlign="center" mb={6} fontWeight={700}>
                    Pricing
                </Typography>
                <Grid container spacing={3}>
                    {[
                        { name: 'Starter', price: 'Free', desc: 'For beginners' },
                        { name: 'Pro', price: 'KSh 499', desc: 'For growing businesses', highlight: true },
                        { name: 'Business', price: 'Custom', desc: 'For large systems' },
                    ].map((plan, i) => (
                        <Grid  key={i}>
                            <Card
                                sx={{
                                    height: '100%',
                                    backgroundColor: plan.highlight ? 'rgba(255, 138, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                                    border: plan.highlight ? '1px solid #FF8A80' : '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                    <Typography variant="h5" mb={1}>{plan.name}</Typography>
                                    <Typography variant="h4" fontWeight={700} mb={2}>{plan.price}</Typography>
                                    <Typography variant="body2" color="text.secondary" mb={3}>{plan.desc}</Typography>
                                    <Button variant={plan.highlight ? 'contained' : 'outlined'} fullWidth>
                                        Choose
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
