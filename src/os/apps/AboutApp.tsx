import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const AboutApp = () => {
    const faqs = [
        {
            question: "How do I install RecordIt on my device?",
            answer: "RecordIt is available on the Google Play Store. Simply click the 'Get Started' button in the RecordIt app or search for 'RecordIt' in the store to download and install."
        },
        {
            question: "Can I manage multiple shops?",
            answer: "Yes! With our Basic, Pro, and Business+ plans, you can manage multiple shop locations from a single dashboard, tracking inventory and sales across all of them seamlessly."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use industry-standard encryption and security measures to ensure your business data is safe. We also support offline mode, syncing your data securely when you're back online."
        },
        {
            question: "What happens if I lose internet connection?",
            answer: "No problem! RecordIt is designed to work offline. You can continue to record sales and update inventory. All changes will automatically sync to the cloud once your connection is restored."
        },
        {
            question: "How do I upgrade my plan?",
            answer: "You can upgrade your plan at any time directly within the app settings. Choose the plan that fits your growing business needs, from Basic to Business+."
        }
    ];

    return (
        <Box sx={{ minHeight: '100%', color: 'white', pb: 8 }}>
            <Container maxWidth="md" sx={{ pt: 6 }}>
                {/* Header */}
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" fontWeight={800} gutterBottom sx={{
                        background: 'linear-gradient(45deg, #FF8A80 30%, #FF5252 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Master RecordIt
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Learn how to take your business to the next level.
                    </Typography>
                </Box>

                {/* Video Placeholder */}
                <MotionBox
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{ mb: 8 }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            width: '100%',
                            aspectRatio: '16/9',
                            bgcolor: '#000',
                            borderRadius: 4,
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            '&:hover .play-icon': {
                                transform: 'scale(1.1)',
                                color: '#FF8A80'
                            }
                        }}
                    >
                        {/* Thumbnail / Placeholder Background */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(circle at center, #2D0A07 0%, #000000 100%)',
                                opacity: 0.8
                            }}
                        />

                        <PlayCircleOutlineIcon
                            className="play-icon"
                            sx={{
                                fontSize: 80,
                                color: 'rgba(255,255,255,0.8)',
                                position: 'relative',
                                zIndex: 1,
                                transition: 'all 0.3s ease'
                            }}
                        />

                        <Typography
                            variant="subtitle1"
                            sx={{
                                position: 'absolute',
                                bottom: 20,
                                left: 20,
                                color: 'white',
                                fontWeight: 600,
                                zIndex: 1
                            }}
                        >
                            Watch Tutorial: Getting Started with RecordIt
                        </Typography>
                    </Paper>
                </MotionBox>

                {/* FAQ Section */}
                <Box>
                    <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
                        Frequently Asked Questions
                    </Typography>

                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.03)',
                                color: 'white',
                                mb: 2,
                                borderRadius: '12px !important',
                                border: '1px solid rgba(255,255,255,0.05)',
                                '&:before': { display: 'none' },
                                '&.Mui-expanded': {
                                    bgcolor: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255, 138, 128, 0.3)'
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#FF8A80' }} />}
                                sx={{
                                    '& .MuiAccordionSummary-content': { my: 2 }
                                }}
                            >
                                <Typography variant="h6" fontWeight={600}>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};
