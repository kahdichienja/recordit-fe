import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Chip,
    Stack,
    CircularProgress,
    Alert,
    Avatar,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetOrderQuery } from '../../api/api';

const PLACEHOLDER_PRODUCT = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending:    { bg: 'rgba(255,193,7,0.15)',   color: '#FFC107' },
    processing: { bg: 'rgba(33,150,243,0.15)',  color: '#42A5F5' },
    shipped:    { bg: 'rgba(156,39,176,0.15)',  color: '#CE93D8' },
    completed:  { bg: 'rgba(76,175,80,0.15)',   color: '#81C784' },
    cancelled:  { bg: 'rgba(244,67,54,0.15)',   color: '#E57373' },
};

// ─── Inner query component (allows conditional hook call) ─────────────────────

const OrderResult = ({ orderId }: { orderId: number }) => {
    const { data: order, isLoading, isError, error } = useGetOrderQuery(orderId);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress sx={{ color: '#FF8A80' }} />
            </Box>
        );
    }

    if (isError) {
        const message =
            (error as { status?: number })?.status === 404
                ? 'No order found with that ID.'
                : 'Failed to fetch order. Please try again.';
        return <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert>;
    }

    if (!order) return null;

    const statusStyle = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;
    const createdDate = new Date(order.created_at).toLocaleDateString('en-KE', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper sx={{ mt: 3, p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Order Header */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                        <Typography variant="h6" fontWeight={800}>Order #{order.id}</Typography>
                        <Typography variant="caption" color="text.secondary">{createdDate}</Typography>
                    </Box>
                    <Chip
                        label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        size="small"
                        sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 700, textTransform: 'capitalize' }}
                    />
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />

                {/* Product */}
                <Box display="flex" gap={2} alignItems="center" mb={2}>
                    <Avatar src={PLACEHOLDER_PRODUCT} variant="rounded" sx={{ width: 56, height: 56 }} />
                    <Box flexGrow={1}>
                        <Typography variant="subtitle2" fontWeight={700}>
                            {order.sales.inventory.product_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                            SKU: {order.sales.inventory.sku}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Qty: {order.sales.product_quantity} × KES {order.sales.product_price.toLocaleString()}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700} color="#FF8A80">
                        KES {order.total_amount.toLocaleString()}
                    </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />

                {/* Shop & Delivery */}
                <Stack spacing={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <StorefrontIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">Shop:</Typography>
                        <Typography variant="body2" fontWeight={600}>{order.shop.name}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                            Delivery to
                        </Typography>
                        <Typography variant="body2">{order.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{order.delivery_address}</Typography>
                        <Typography variant="body2" color="text.secondary">{order.phone_number}</Typography>
                        <Typography variant="body2" color="text.secondary">{order.email}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 2 }} />

                {/* Total */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                    <Typography variant="h6" fontWeight={800} color="#FF8A80">
                        KES {order.total_amount.toLocaleString()}
                    </Typography>
                </Box>
            </Paper>
        </motion.div>
    );
};

// ─── Main OrderTrack Panel ────────────────────────────────────────────────────

interface OrderTrackProps {
    onClose: () => void;
}

export const OrderTrack = ({ onClose }: OrderTrackProps) => {
    const [inputValue, setInputValue] = useState('');
    const [searchId, setSearchId] = useState<number | null>(null);

    const handleSearch = () => {
        const parsed = parseInt(inputValue.trim(), 10);
        if (!isNaN(parsed) && parsed > 0) {
            setSearchId(parsed);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{
                p: 3,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <ReceiptLongIcon sx={{ color: '#FF8A80' }} />
                    <Typography variant="h6" fontWeight={700}>Track Order</Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Body */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Enter your order number to see the current status and details.
                </Typography>

                {/* Search Bar */}
                <Box display="flex" gap={1}>
                    <TextField
                        fullWidth
                        placeholder="e.g. 1"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                '&:hover fieldset': { borderColor: '#FF8A80' },
                                '&.Mui-focused fieldset': { borderColor: '#FF8A80' },
                            },
                            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.3)' },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ bgcolor: '#FF8A80', color: 'black', fontWeight: 700, '&:hover': { bgcolor: '#FF5252' }, minWidth: 48, px: 2 }}
                    >
                        <SearchIcon />
                    </Button>
                </Box>

                {/* Result */}
                <AnimatePresence mode="wait">
                    {searchId !== null && (
                        <OrderResult key={searchId} orderId={searchId} />
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    );
};
