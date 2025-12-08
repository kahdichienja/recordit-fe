import { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Chip, IconButton, Rating, Stack, Drawer, Badge, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOPS, type Shop, type Product } from '../data/marketplace';

const MotionBox = motion(Box);

interface CartItem extends Product {
    quantity: number;
    shopName: string;
}

export const MarketplaceApp = () => {
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleShopClick = (shop: Shop) => {
        setSelectedShop(shop);
        setSelectedCategory('All');
    };

    const handleBack = () => {
        setSelectedShop(null);
    };

    // --- Cart Logic ---
    const addToCart = (product: Product, shopName: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1, shopName }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <Box sx={{ minHeight: '100%', color: 'white', position: 'relative' }}>
            {/* Header with Cart Button */}
            <Box sx={{ position: 'absolute', top: 20, right: 30, zIndex: 10 }}>
                <IconButton
                    onClick={() => setIsCartOpen(true)}
                    sx={{
                        bgcolor: 'rgba(255, 138, 128, 0.2)',
                        color: '#FF8A80',
                        border: '1px solid rgba(255, 138, 128, 0.3)',
                        '&:hover': { bgcolor: '#FF8A80', color: 'white' }
                    }}
                >
                    <Badge badgeContent={cart.reduce((a, b) => a + b.quantity, 0)} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Box>

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
                        onAddToCart={addToCart}
                    />
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 400 },
                        bgcolor: '#0B0000',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        p: 0
                    }
                }}
            // Ensure drawer renders inside the app window context if possible, 
            // but MUI Drawer uses portal by default. For a "Desktop" app feel, 
            // typically we'd want custom layout code, but Portal is fine for this simulated OS.
            // To keep it contained within the window, we might need a custom side-panel implementation,
            // but standard Drawer is acceptable for "System" level feel or we just assume it overlays the window.
            // Ideally, in this OS, it should be inside the window.
            // Let's use a "Sidebar" styled Box if we want it in-window, OR just let it slide over.
            // Let's stick to MUI Drawer for simplicity and "Overlay" feel.
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight={700}>Your Cart</Typography>
                        <IconButton onClick={() => setIsCartOpen(false)} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                        {cart.length === 0 ? (
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                <ShoppingCartIcon sx={{ fontSize: 60, mb: 2 }} />
                                <Typography>Your cart is empty</Typography>
                            </Box>
                        ) : (
                            <Stack spacing={3}>
                                {cart.map(item => (
                                    <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
                                        <Avatar src={item.image} variant="rounded" sx={{ width: 70, height: 70 }} />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle2" fontWeight={700} noWrap>{item.name}</Typography>
                                            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                                {item.shopName}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="#FF8A80" fontWeight={600}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                                                    <IconButton size="small" onClick={() => updateQuantity(item.id, -1)} sx={{ color: 'white', p: 0.5 }}>
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography variant="caption">{item.quantity}</Typography>
                                                    <IconButton size="small" onClick={() => updateQuantity(item.id, 1)} sx={{ color: 'white', p: 0.5 }}>
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            onClick={() => removeFromCart(item.id)}
                                            sx={{ color: 'text.secondary', alignSelf: 'flex-start', '&:hover': { color: 'error.main' } }}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Box>

                    <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6" fontWeight={800} color="#FF8A80">${cartTotal.toFixed(2)}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={cart.length === 0}
                            sx={{
                                bgcolor: '#FF8A80',
                                color: 'black',
                                fontWeight: 700,
                                '&:hover': { bgcolor: '#FF5252' }
                            }}
                        >
                            Checkout
                        </Button>
                    </Box>
                </Box>
            </Drawer>
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
                <Grid key={shop.id}>
                    <Card
                        onClick={() => onShopClick(shop)}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 4,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
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
    setSelectedCategory,
    onAddToCart
}: {
    shop: Shop,
    onBack: () => void,
    selectedCategory: string,
    setSelectedCategory: (c: string) => void,
    onAddToCart: (p: Product, shopName: string) => void
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
                                        onClick={() => onAddToCart(product, shop.name)}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 12,
                                            right: 12,
                                            bgcolor: 'rgba(255,255,255,0.9)',
                                            color: 'black',
                                            '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' },
                                            transition: 'all 0.2s'
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
