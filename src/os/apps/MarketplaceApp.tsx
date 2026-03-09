import { useState } from 'react';
import {
    Box, Typography, Button, Grid, Card, CardContent, CardMedia,
    Chip, IconButton, Stack, Badge, Avatar, TextField,
    Paper, Divider, CircularProgress, Alert, Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { OrderTrack } from '../components/OrderTrack';

import {
    useGetShopsQuery,
    useGetShopProductsQuery,
    useCreateOrderMutation,
} from '../../api/api';
import type { Shop, InventoryItem, CreateOrderPayload } from '../../api/api';
import {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} from '../../api/cartSlice';
import type { CartItem } from '../../api/cartSlice';
import type { RootState } from '../../api/store';

// Placeholder image for products/shops (user will supply real images later)
const PLACEHOLDER_SHOP = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80';
const PLACEHOLDER_COVER = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80';
const PLACEHOLDER_PRODUCT = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80';

const MotionBox = motion(Box);

type ViewState = 'list' | 'detail' | 'checkout' | 'success';

// ─── Shop List View ───────────────────────────────────────────────────────────

const ShopListView = ({
    onShopClick
}: {
    onShopClick: (s: Shop) => void
}) => {
    const { data: shops, isLoading, isError } = useGetShopsQuery();

    return (
        <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            sx={{ p: 4 }}
        >
            <Typography variant="h4" fontWeight={800} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StorefrontIcon fontSize="large" sx={{ color: '#FF8A80' }} />
                MarketPlace
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Discover unique shops and premium products.
            </Typography>

            {isLoading && (
                <Box display="flex" justifyContent="center" mt={8}>
                    <CircularProgress sx={{ color: '#FF8A80' }} />
                </Box>
            )}

            {isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Failed to load shops. Make sure the backend is running at http://127.0.0.1:8000
                </Alert>
            )}

            {shops && (
                <Grid container spacing={3}>
                    {shops.map((shop) => (
                        <Grid key={shop.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                                    image={PLACEHOLDER_SHOP}
                                    alt={shop.name}
                                />
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                        <Typography variant="h6" fontWeight={700}>{shop.name}</Typography>
                                        <Chip
                                            label={`${shop.inventory.length} items`}
                                            size="small"
                                            sx={{ bgcolor: 'rgba(255, 138, 128, 0.1)', color: '#FF8A80' }}
                                        />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" noWrap mb={1}>
                                        {shop.description}
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={0.5}>
                                        <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">{shop.location}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </MotionBox>
    );
};

// ─── Shop Detail View ─────────────────────────────────────────────────────────

const ShopDetailView = ({
    shop,
    onBack,
    onAddToCart,
}: {
    shop: Shop;
    onBack: () => void;
    onAddToCart: (product: InventoryItem, shop: Shop) => void;
}) => {
    const { data, isLoading, isError } = useGetShopProductsQuery(shop.id);

    return (
        <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            {/* Banner */}
            <Box sx={{
                height: 150,
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), #0B0000), url(${PLACEHOLDER_COVER})`,
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
                {isLoading && (
                    <Box display="flex" justifyContent="center" mt={8}>
                        <CircularProgress sx={{ color: '#FF8A80' }} />
                    </Box>
                )}
                {isError && (
                    <Alert severity="error">Failed to load products for this shop.</Alert>
                )}

                {data && (
                    <Grid container spacing={3}>
                        {data.products.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Card sx={{
                                    bgcolor: 'transparent',
                                    border: 'none',
                                    '&:hover .MuiCardMedia-root': { transform: 'scale(1.05)' }
                                }}>
                                    <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 2, position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={PLACEHOLDER_PRODUCT}
                                            alt={product.product_name}
                                            sx={{ transition: 'transform 0.5s', bgcolor: '#222' }}
                                        />
                                        <IconButton
                                            onClick={() => onAddToCart(product, shop)}
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
                                    <Typography variant="subtitle1" fontWeight={700}>{product.product_name}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                        SKU: {product.sku}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" color="secondary.main">
                                            KES {product.selling_price.toLocaleString()}
                                        </Typography>
                                        <Chip
                                            label={`${product.product_quantity} in stock`}
                                            size="small"
                                            sx={{
                                                bgcolor: product.product_quantity > 0
                                                    ? 'rgba(76,175,80,0.15)'
                                                    : 'rgba(244,67,54,0.15)',
                                                color: product.product_quantity > 0 ? '#81C784' : '#E57373'
                                            }}
                                        />
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </MotionBox>
    );
};

// ─── Receipt Data Type ───────────────────────────────────────────────────────

interface ReceiptData {
    orderId: number;
    name: string;
    email: string;
    phone_number: string;
    delivery_address: string;
    items: CartItem[];
    total: number;
    date: string;
}

// ─── Checkout View ────────────────────────────────────────────────────────────

const CheckoutView = ({
    cart,
    total,
    onBack,
    onOrderSuccess,
}: {
    cart: CartItem[];
    total: number;
    onBack: () => void;
    onOrderSuccess: (data: ReceiptData) => void;
}) => {
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone_number: '',
        delivery_address: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
        if (!form.phone_number.trim()) e.phone_number = 'Phone number is required';
        if (!form.delivery_address.trim()) e.delivery_address = 'Delivery address is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validate()) return;
        try {
            // Create one order per cart item
            let lastOrderId = 0;
            for (const item of cart) {
                const payload: CreateOrderPayload = {
                    inventory_id: item.productId as unknown as number,
                    shop_id: item.shopId as unknown as number,
                    product_quantity: item.quantity,
                    delivery_address: form.delivery_address,
                    phone_number: form.phone_number,
                    email: form.email,
                    name: form.name,
                };
                const result = await createOrder(payload).unwrap();
                lastOrderId = result.id;
            }
            onOrderSuccess({
                orderId: lastOrderId,
                name: form.name,
                email: form.email,
                phone_number: form.phone_number,
                delivery_address: form.delivery_address,
                items: cart,
                total,
                date: new Date().toLocaleString('en-KE', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                }),
            });
        } catch {
            setErrors({ submit: 'Failed to place order. Please try again.' });
        }
    };

    const field = (label: string, key: keyof typeof form, fullWidth = true) => (
        <TextField
            label={label}
            value={form[key]}
            onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
            error={!!errors[key]}
            helperText={errors[key]}
            fullWidth={fullWidth}
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                '& .MuiFormHelperText-root': { color: '#FF8A80' }
            }}
        />
    );

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}
        >
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: 'white', mb: 4 }}>
                Continue Shopping
            </Button>

            <Typography variant="h4" fontWeight={800} gutterBottom>
                Checkout
            </Typography>

            {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}

            <Grid container spacing={4}>
                {/* Left: Form */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="h6" fontWeight={700} mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="secondary" /> Delivery Information
                        </Typography>
                        <Stack spacing={2}>
                            {field('Full Name', 'name')}
                            {field('Email', 'email')}
                            {field('Phone Number', 'phone_number')}
                            {field('Delivery Address', 'delivery_address')}
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right: Order Summary */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="h6" fontWeight={700} mb={3}>Order Summary</Typography>
                        <Stack spacing={2} mb={3}>
                            {cart.map(item => (
                                <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Badge badgeContent={item.quantity} color="primary">
                                            <Avatar src={PLACEHOLDER_PRODUCT} variant="rounded" sx={{ width: 40, height: 40 }} />
                                        </Badge>
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                KES {item.price.toLocaleString()} / item
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography fontWeight={600}>
                                        KES {(item.price * item.quantity).toLocaleString()}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="text.secondary">Subtotal</Typography>
                            <Typography>KES {total.toLocaleString()}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography color="text.secondary">Shipping</Typography>
                            <Typography color="success.main">Free</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6" color="#FF8A80">KES {total.toLocaleString()}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isLoading || cart.length === 0}
                            onClick={handlePlaceOrder}
                            sx={{
                                bgcolor: '#FF8A80',
                                color: 'black',
                                fontWeight: 700,
                                '&:hover': { bgcolor: '#FF5252' }
                            }}
                        >
                            {isLoading ? 'Placing Order...' : 'Place Order'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </MotionBox>
    );
};

// ─── Receipt download helper ─────────────────────────────────────────────────

function downloadReceipt(r: ReceiptData) {
    const rows = r.items.map(item => `
        <tr>
            <td style="padding:10px 8px;border-bottom:1px solid #eee">${item.name}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right">KES ${item.price.toLocaleString()}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right">KES ${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Receipt #${r.orderId}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; color: #333; padding: 40px; }
    .card { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #FF8A80, #FF5252); color: #fff; padding: 32px; text-align: center; }
    .header h1 { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
    .header p { opacity: 0.85; font-size: 14px; }
    .section { padding: 24px 32px; border-bottom: 1px solid #f0f0f0; }
    .section h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 12px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
    .info-item label { font-size: 11px; color: #aaa; display: block; margin-bottom: 2px; }
    .info-item span { font-size: 14px; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #999; padding: 8px; text-align: left; border-bottom: 2px solid #eee; }
    th:nth-child(2) { text-align: center; }
    th:nth-child(3), th:nth-child(4) { text-align: right; }
    .total-row { padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; background: #fafafa; }
    .total-row span { font-size: 15px; color: #666; }
    .total-row strong { font-size: 22px; font-weight: 800; color: #FF5252; }
    .footer { text-align: center; padding: 20px 32px; font-size: 12px; color: #bbb; }
    @media print { body { background: #fff; padding: 0; } .card { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Order Receipt</h1>
      <p>Order #${r.orderId} &nbsp;·&nbsp; ${r.date}</p>
    </div>
    <div class="section">
      <h2>Customer</h2>
      <div class="info-grid">
        <div class="info-item"><label>Name</label><span>${r.name}</span></div>
        <div class="info-item"><label>Email</label><span>${r.email}</span></div>
        <div class="info-item"><label>Phone</label><span>${r.phone_number}</span></div>
        <div class="info-item"><label>Delivery Address</label><span>${r.delivery_address}</span></div>
      </div>
    </div>
    <div class="section">
      <h2>Items</h2>
      <table>
        <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="total-row"><span>Total Amount</span><strong>KES ${r.total.toLocaleString()}</strong></div>
    <div class="footer">Thank you for your order! Please keep this receipt for your records.</div>
  </div>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (win) {
        win.document.write(html);
        win.document.close();
    }
}

// ─── Success View ─────────────────────────────────────────────────────────────

const SuccessView = ({ receipt, onContinue }: { receipt: ReceiptData; onContinue: () => void }) => (
    <MotionBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        sx={{ overflowY: 'auto', p: 4, maxWidth: 640, mx: 'auto' }}
    >
        {/* Confirmation banner */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#81C784', mb: 2 }} />
            <Typography variant="h4" fontWeight={800} mb={1}>Order Placed!</Typography>
            <Typography color="text.secondary">
                Thank you for your order. We'll send a confirmation to your email.
            </Typography>
        </Box>

        {/* Receipt card */}
        <Paper sx={{ bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', mb: 3 }}>
            {/* Header */}
            <Box sx={{ background: 'linear-gradient(135deg, #FF8A80, #FF5252)', p: 3, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={800}>Receipt</Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    Order #{receipt.orderId} &nbsp;·&nbsp; {receipt.date}
                </Typography>
            </Box>

            {/* Customer info */}
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={1.5} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Customer</Typography>
                <Grid container spacing={1}>
                    {[['Name', receipt.name], ['Email', receipt.email], ['Phone', receipt.phone_number], ['Delivery', receipt.delivery_address]].map(([label, value]) => (
                        <Grid key={label} size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary">{label}</Typography>
                            <Typography variant="body2" fontWeight={600}>{value}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Items */}
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={1.5} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Items</Typography>
                <Stack spacing={1.5}>
                    {receipt.items.map(item => (
                        <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                                <Typography variant="caption" color="text.secondary">Qty: {item.quantity} × KES {item.price.toLocaleString()}</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={700} color="#FF8A80">
                                KES {(item.price * item.quantity).toLocaleString()}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>

            {/* Total */}
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" fontWeight={800} color="#FF8A80">KES {receipt.total.toLocaleString()}</Typography>
            </Box>
        </Paper>

        {/* Actions */}
        <Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<DownloadIcon />}
                onClick={() => downloadReceipt(receipt)}
                sx={{ borderColor: '#FF8A80', color: '#FF8A80', fontWeight: 700, '&:hover': { borderColor: '#FF5252', bgcolor: 'rgba(255,82,82,0.08)' } }}
            >
                Download Receipt
            </Button>
            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={onContinue}
                sx={{ bgcolor: '#FF8A80', color: 'black', fontWeight: 700, '&:hover': { bgcolor: '#FF5252' } }}
            >
                Continue Shopping
            </Button>
        </Stack>
    </MotionBox>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const MarketplaceApp = () => {
    const [view, setView] = useState<ViewState>('list');
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOrderTrackOpen, setIsOrderTrackOpen] = useState(false);
    const [successReceipt, setSuccessReceipt] = useState<ReceiptData | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; type: 'success' | 'warning' }>({
        open: false,
        message: '',
        type: 'success',
    });

    const dispatch = useDispatch();
    const cartState = useSelector((state: RootState) => state.cart);
    const cartItems = cartState.items;
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleShopClick = (shop: Shop) => {
        setSelectedShop(shop);
        setView('detail');
    };

    const handleBack = () => {
        if (view === 'checkout' || view === 'success') {
            setView(selectedShop ? 'detail' : 'list');
        } else {
            setSelectedShop(null);
            setView('list');
        }
    };

    const handleAddToCart = (product: InventoryItem, shop: Shop) => {
        if (cartState.shopId && cartState.shopId !== String(shop.id)) {
            setSnackbar({
                open: true,
                message: `Your cart already has items from another shop. Clear your cart first.`,
                type: 'warning',
            });
            return;
        }

        dispatch(addToCart({
            productId: String(product.id),
            shopId: String(shop.id),
            name: product.product_name,
            price: product.selling_price,
            quantity: 1,
        }));
        setSnackbar({ open: true, message: `${product.product_name} added to cart!`, type: 'success' });
    };

    const handleOrderSuccess = (data: ReceiptData) => {
        setSuccessReceipt(data);
        dispatch(clearCart());
        setView('success');
    };

    return (
        <Box
            sx={{ minHeight: '100%', color: 'white', position: 'relative', overflow: 'hidden' }}
        >
            {/* FABs */}
            <Box sx={{ position: 'fixed', top: 99, right: 30, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Cart FAB */}
                <IconButton
                    onClick={() => setIsCartOpen(true)}
                    sx={{
                        bgcolor: 'rgba(255, 138, 128, 0.2)',
                        color: '#FF8A80',
                        border: '1px solid rgba(255, 138, 128, 0.3)',
                        '&:hover': { bgcolor: '#FF8A80', color: 'white' }
                    }}
                >
                    <Badge badgeContent={cartCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                {/* Order Track FAB */}
                <IconButton
                    onClick={() => setIsOrderTrackOpen(true)}
                    sx={{
                        bgcolor: 'rgba(255, 138, 128, 0.1)',
                        color: '#FF8A80',
                        border: '1px solid rgba(255, 138, 128, 0.2)',
                        '&:hover': { bgcolor: '#FF8A80', color: 'white' }
                    }}
                    title="Track Order"
                >
                    <ReceiptLongIcon />
                </IconButton>
            </Box>

            <AnimatePresence mode="wait">
                {view === 'list' && (
                    <ShopListView key="list" onShopClick={handleShopClick} />
                )}
                {view === 'detail' && selectedShop && (
                    <ShopDetailView
                        key="detail"
                        shop={selectedShop}
                        onBack={handleBack}
                        onAddToCart={handleAddToCart}
                    />
                )}
                {view === 'checkout' && (
                    <CheckoutView
                        key="checkout"
                        cart={cartItems}
                        total={cartTotal}
                        onBack={handleBack}
                        onOrderSuccess={handleOrderSuccess}
                    />
                )}
                {view === 'success' && successReceipt && (
                    <SuccessView
                        key="success"
                        receipt={successReceipt}
                        onContinue={() => { setSelectedShop(null); setView('list'); }}
                    />
                )}
            </AnimatePresence>

            {/* ── Cart Slide Panel ─────────────────────────────────────── */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop */}
                        <MotionBox
                            key="cart-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsCartOpen(false)}
                            sx={{
                                position: 'absolute', inset: 0,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                zIndex: 20,
                            }}
                        />
                        {/* Panel */}
                        <MotionBox
                            key="cart-panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
                            sx={{
                                position: 'absolute', top: 0, right: 0, bottom: 0,
                                width: { xs: '100%', sm: 400 },
                                bgcolor: '#0B0000',
                                borderLeft: '1px solid rgba(255,255,255,0.1)',
                                zIndex: 21,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Header */}
                            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h5" fontWeight={700}>Your Cart</Typography>
                                <IconButton onClick={() => setIsCartOpen(false)} sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            {cartState.shopId && (
                                <Box sx={{ px: 3, pt: 2 }}>
                                    <Chip
                                        icon={<StorefrontIcon />}
                                        label={`Shopping from shop #${cartState.shopId}`}
                                        size="small"
                                        sx={{ bgcolor: 'rgba(255,138,128,0.1)', color: '#FF8A80' }}
                                    />
                                </Box>
                            )}

                            {/* Items */}
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                                {cartItems.length === 0 ? (
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                        <ShoppingCartIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography>Your cart is empty</Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={3}>
                                        {cartItems.map(item => (
                                            <Box key={item.productId} sx={{ display: 'flex', gap: 2 }}>
                                                <Avatar src={PLACEHOLDER_PRODUCT} variant="rounded" sx={{ width: 70, height: 70 }} />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="subtitle2" fontWeight={700} noWrap>{item.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                                        KES {item.price.toLocaleString()}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Typography variant="body2" color="#FF8A80" fontWeight={600}>
                                                            KES {(item.price * item.quantity).toLocaleString()}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                                                            <IconButton size="small" onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))} sx={{ color: 'white', p: 0.5 }}>
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                            <Typography variant="caption">{item.quantity}</Typography>
                                                            <IconButton size="small" onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))} sx={{ color: 'white', p: 0.5 }}>
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <IconButton
                                                    onClick={() => dispatch(removeFromCart(item.productId))}
                                                    sx={{ color: 'text.secondary', alignSelf: 'flex-start', '&:hover': { color: 'error.main' } }}
                                                >
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Box>

                            {/* Footer */}
                            <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6" fontWeight={800} color="#FF8A80">
                                        KES {cartTotal.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained" fullWidth size="large"
                                    disabled={cartItems.length === 0}
                                    onClick={() => { setIsCartOpen(false); setView('checkout'); }}
                                    sx={{ bgcolor: '#FF8A80', color: 'black', fontWeight: 700, '&:hover': { bgcolor: '#FF5252' } }}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Box>
                        </MotionBox>
                    </>
                )}
            </AnimatePresence>

            {/* ── Order Track Slide Panel ───────────────────────────────── */}
            <AnimatePresence>
                {isOrderTrackOpen && (
                    <>
                        {/* Backdrop */}
                        <MotionBox
                            key="ot-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOrderTrackOpen(false)}
                            sx={{
                                position: 'absolute', inset: 0,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                zIndex: 20,
                            }}
                        />
                        {/* Panel */}
                        <MotionBox
                            key="ot-panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
                            sx={{
                                position: 'absolute', top: 0, right: 0, bottom: 0,
                                width: { xs: '100%', sm: 440 },
                                bgcolor: '#0B0000',
                                borderLeft: '1px solid rgba(255,255,255,0.1)',
                                zIndex: 21,
                                overflow: 'hidden',
                            }}
                        >
                            <OrderTrack onClose={() => setIsOrderTrackOpen(false)} />
                        </MotionBox>
                    </>
                )}
            </AnimatePresence>

            {/* Snackbar feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.type}
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    sx={{ bgcolor: snackbar.type === 'success' ? 'rgba(76,175,80,0.9)' : 'rgba(255,152,0,0.9)', color: 'white' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
