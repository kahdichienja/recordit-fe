import { Box, Button, Container, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export const RecordItApp = () => {
    const features = [
        { icon: <InventoryIcon sx={{ fontSize: 40, color: '#FF8A80' }} />, title: 'Smart Inventory', desc: 'Track stock in real-time across multiple locations.' },
        { icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#FF8A80' }} />, title: 'Sales Analytics', desc: 'Visualize your growth with powerful charts.' },
        { icon: <StoreIcon sx={{ fontSize: 40, color: '#FF8A80' }} />, title: 'Multi-Shop', desc: 'Manage all your branches from one dashboard.' },
    ];

    const plans = [
        {
            name: 'Free Plan',
            price: '1.00',
            period: '/m',
            features: ['Create upto 1 shops'],
            highlight: false,
            btnText: 'Current Plan',
            btnVariant: 'outlined' as const
        },
        {
            name: 'Basic Plan',
            price: '150.00',
            period: '/m',
            features: ['Create upto 2 shop assistants', 'Create upto 2 shops'],
            highlight: false,
            btnText: 'Upgrade My Plan',
            btnVariant: 'contained' as const
        },
        {
            name: 'Pro Plan',
            price: '300.00',
            period: '/m',
            features: ['General Inventory statistics', 'Sales Analytics', 'Inventory Analytics', 'Create upto 5 shop assistants'],
            highlight: true,
            tag: 'PRO',
            btnText: 'Upgrade My Plan',
            btnVariant: 'contained' as const
        },
        {
            name: 'Business+ Plan',
            price: '500.00',
            period: '/m',
            features: ['Stock Velocity', 'Sales Recommendations', 'Sales Analytics', 'Inventory Analytics', 'Profit margin Analytics', 'Create upto 15 shop assistants', 'Create upto 10 shops'],
            highlight: false,
            tag: 'BUSINESS+',
            btnText: 'Upgrade My Plan',
            btnVariant: 'contained' as const
        }
    ];

    return (
        <Box sx={{ minHeight: '100%', color: 'white', pb: 8, overflowX: 'hidden' }}>
            {/* Hero Section */}
            <Box sx={{
                position: 'relative',
                pt: 12,
                pb: 12,
                background: 'radial-gradient(circle at 50% 0%, #2D0A07 0%, transparent 70%)'
            }}>
                <Container maxWidth="lg">
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={6}>
                        <Box flex={1}>
                            <MotionTypography
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                variant="h2"
                                fontWeight={800}
                                sx={{
                                    background: 'linear-gradient(45deg, #FFFFFF 30%, #FF8A80 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 2,
                                    lineHeight: 1.1,
                                    fontSize: { xs: '2.5rem', md: '3.75rem' }
                                }}
                            >
                                Unlock Top Retail Power You Thought Was Out of Reach.
                            </MotionTypography>
                            <MotionTypography
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                variant="h5"
                                color="text.secondary"
                                sx={{ mb: 4, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                            >
                                Now Just One Click Away! Manage inventory, sales, and staff with magic.
                            </MotionTypography>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    href="https://play.google.com/store/apps/details?id=com.potfolioxllc.recordit&pcampaignid=web_share"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        borderRadius: 50,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        background: 'linear-gradient(45deg, #FF8A80 30%, #FF5252 90%)',
                                        boxShadow: '0 8px 20px rgba(255, 82, 82, 0.3)',
                                        "&hover": {
                                            background: 'linear-gradient(45deg, #FF5252 30%, #FF8A80 90%)',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Get Started
                                </Button>
                            </motion.div>
                        </Box>
                        <Box flex={1} display="flex" justifyContent="center" position="relative">
                            <MotionBox
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                sx={{
                                    position: 'relative',
                                    height: 400,
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* Abstract Visual Representation */}
                                <Box sx={{
                                    position: 'absolute',
                                    width: 300,
                                    height: 300,
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Box sx={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: '50%',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography variant="h3" fontWeight={800}>20k+</Typography>
                                    </Box>
                                </Box>
                                {/* Floating Icons */}
                                <Box sx={{ position: 'absolute', top: 0, right: 40, p: 2, bgcolor: '#1A0505', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <TrendingUpIcon sx={{ color: '#FF8A80' }} />
                                </Box>
                                <Box sx={{ position: 'absolute', bottom: 40, left: 0, p: 2, bgcolor: '#1A0505', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <GroupIcon sx={{ color: '#FF8A80' }} />
                                </Box>
                            </MotionBox>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mb: 12 }}>
                <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
                    {features.map((feature, index) => (
                        <Box key={index} flex={{ xs: '1 1 100%', md: '1 1 30%' }} minWidth={280}>
                            <MotionBox
                                whileHover={{ y: -10 }}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    bgcolor: 'rgba(255,255,255,0.03)',
                                    borderRadius: 4,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                <Typography variant="h6" fontWeight={700} gutterBottom>{feature.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                            </MotionBox>
                        </Box>
                    ))}
                </Box>
            </Container>

            {/* Pricing Section */}
            <Container maxWidth="lg" sx={{ mb: 12 }}>
                <Box textAlign="center" mb={8}>
                    <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>Flexible plans for your workspace</Typography>
                    <Typography variant="h6" color="text.secondary">Choose your plan and make your business decision excel with magic</Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
                    {plans.map((plan, index) => (
                        <Box key={index} flex={{ xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' }} minWidth={250}>
                            <Card
                                sx={{
                                    height: '100%',
                                    bgcolor: 'rgba(255,255,255,0.02)',
                                    borderRadius: 4,
                                    border: `1px solid ${plan.highlight ? '#FF8A80' : 'rgba(255,255,255,0.1)'}`,
                                    position: 'relative',
                                    overflow: 'visible',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.5)'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" fontWeight={700}>{plan.name}</Typography>
                                        {plan.tag && (
                                            <Chip label={plan.tag} size="small" sx={{ bgcolor: '#3E1010', color: '#FF8A80', fontWeight: 700, borderRadius: 1 }} />
                                        )}
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" gutterBottom>Subscription</Typography>

                                    <Box sx={{ my: 2, display: 'flex', alignItems: 'baseline' }}>
                                        <Typography variant="body1" color="text.secondary" sx={{ mr: 0.5 }}>Ksh</Typography>
                                        <Typography variant="h3" fontWeight={700}>{plan.price}</Typography>
                                        <Typography variant="body1" color="text.secondary">{plan.period}</Typography>
                                    </Box>

                                    <Typography variant="caption" color="text.secondary" display="block" mb={3}>
                                        Billed Monthly <CheckCircleIcon sx={{ fontSize: 14, verticalAlign: 'middle', ml: 0.5 }} />
                                    </Typography>

                                    <Stack spacing={1.5} mb={4} flexGrow={1}>
                                        {plan.features.map((feature, idx) => (
                                            <Box key={idx} display="flex" alignItems="center" gap={1}>
                                                <CheckCircleIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left' }}>{feature}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>

                                    <Button
                                        variant={plan.btnVariant}
                                        fullWidth
                                        href="https://play.google.com/store/apps/details?id=com.potfolioxllc.recordit&pcampaignid=web_share"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            mt: 'auto',
                                            bgcolor: plan.btnVariant === 'contained' ? '#1565C0' : 'transparent',
                                            borderColor: '#1565C0',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: plan.btnVariant === 'contained' ? '#0D47A1' : 'rgba(21, 101, 192, 0.1)'
                                            }
                                        }}
                                    >
                                        {plan.btnText}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>

           
        </Box>
    );
};
