import { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Chip, IconButton, Rating, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOPS, type Shop } from '../data/marketplace';

const MotionBox = motion(Box);

export const MarketplaceApp = () => {
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const handleShopClick = (shop: Shop) => {
        setSelectedShop(shop);
        setSelectedCategory('All');
    };

    const handleBack = () => {
        setSelectedShop(null);
    };

    return (
        <Box sx={{ minHeight: '100%', color: 'white' }}>
            <AnimatePresence mode="wait">
                {!selectedShop ? (
                    <ShopListView key="list" shops={SHOPS} onShopClick={handleShopClick} />
                ) : (
                    <ShopDetailView
                        key="detail"
                        shop={selectedShop}
                        onBack={handleBack}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                )}
            </AnimatePresence>
        </Box>
    );
};

// --- Sub-Components ---

const ShopListView = ({ shops, onShopClick }: { shops: Shop[], onShopClick: (s: Shop) => void }) => (
    <MotionBox
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        sx={{ p: 4 }}
    >
        <Typography variant="h4" fontWeight={800} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StorefrontIcon fontSize="large" sx={{ color: '#FF8A80' }} />
            Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
            Discover unique shops and premium products.
        </Typography>

        <Grid container spacing={3}>
            {shops.map((shop: Shop) => (
                <Grid key={shop.id} sx={{width: '30%', height: '40%'}}>
                    <Card
                        onClick={() => onShopClick(shop)}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 4,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            width: '100%',
                            height: '100%',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="180"
                            width="100"
                            image={shop.image}
                            alt={shop.name}
                        />
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6" fontWeight={700}>{shop.name}</Typography>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <Rating value={shop.rating} precision={0.1} size="small" readOnly />
                                    <Typography variant="caption" color="text.secondary">({shop.rating})</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" noWrap mb={2}>
                                {shop.description}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {shop.categories.slice(0, 3).map(cat => (
                                    <Chip key={cat} label={cat} size="small" sx={{ bgcolor: 'rgba(255, 138, 128, 0.1)', color: '#FF8A80' }} />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </MotionBox>
);

const ShopDetailView = ({
    shop,
    onBack,
    selectedCategory,
    setSelectedCategory
}: {
    shop: Shop,
    onBack: () => void,
    selectedCategory: string,
    setSelectedCategory: (c: string) => void
}) => {
    const filteredProducts = selectedCategory === 'All'
        ? shop.products
        : shop.products.filter(p => p.category === selectedCategory);

    return (
        <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            {/* Header / Banner */}
            <Box sx={{
                height: 150,
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), #0B0000), url(${shop.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                p: 4,
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <Box>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={onBack}
                        sx={{ color: 'white', mb: 2, bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                    >
                        Back to Shops
                    </Button>
                    <Typography variant="h3" fontWeight={800}>{shop.name}</Typography>
                    <Typography variant="body1" color="gray">{shop.description}</Typography>
                </Box>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 4 }}>
                {/* Filters */}
                <Box sx={{ mb: 4, display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                    <Chip
                        label="All Products"
                        onClick={() => setSelectedCategory('All')}
                        color={selectedCategory === 'All' ? 'secondary' : 'default'}
                        variant={selectedCategory === 'All' ? 'filled' : 'outlined'}
                        sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                    />
                    {shop.categories.map(cat => (
                        <Chip
                            key={cat}
                            label={cat}
                            onClick={() => setSelectedCategory(cat)}
                            color={selectedCategory === cat ? 'secondary' : 'default'}
                            variant={selectedCategory === cat ? 'filled' : 'outlined'}
                            sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        />
                    ))}
                </Box>

                {/* Product Grid */}
                <Grid container spacing={3}>
                    {filteredProducts.map(product => (
                        <Grid key={product.id}>
                            <Card sx={{
                                bgcolor: 'transparent',
                                border: 'none',
                                '&:hover .MuiCardMedia-root': { transform: 'scale(1.05)' }
                            }}>
                                <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 2, position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={product.image}
                                        alt={product.name}
                                        sx={{ transition: 'transform 0.5s', bgcolor: '#222' }}
                                    />
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            bottom: 12,
                                            right: 12,
                                            bgcolor: 'rgba(255,255,255,0.9)',
                                            color: 'black',
                                            '&:hover': { bgcolor: 'white' }
                                        }}
                                    >
                                        <ShoppingCartIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="subtitle1" fontWeight={700}>{product.name}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>{product.category}</Typography>
                                <Typography variant="h6" color="secondary.main">${product.price.toFixed(2)}</Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </MotionBox>
    );
};
