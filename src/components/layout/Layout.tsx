import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.default',
            }}
        >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};
