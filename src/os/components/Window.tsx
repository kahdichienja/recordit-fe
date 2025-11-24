import { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import { type AppInstance, useWindowManager } from '../context/WindowManager';

interface WindowProps {
    window: AppInstance;
}

export const Window = ({ window }: WindowProps) => {
    const theme = useTheme();
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useWindowManager();
    const constraintsRef = useRef(null);
    const dragControls = useDragControls();

    const isActive = activeWindowId === window.id;

    return (
        <motion.div
            drag={!window.isMaximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{
                scale: window.isMinimized ? 0 : window.isMaximized ? 1 : 1,
                opacity: window.isMinimized ? 0 : 1,
                y: window.isMinimized ? 200 : 0,
                width: window.isMaximized ? '100vw' : 'min(90vw, 1200px)',
                height: window.isMaximized ? 'calc(100vh - 32px)' : 'min(80vh, 800px)',
                x: window.isMaximized ? 0 : undefined,
                top: window.isMaximized ? 32 : undefined,
                left: window.isMaximized ? 0 : undefined,
            }}
            style={{
                position: window.isMaximized ? 'fixed' : 'absolute',
                zIndex: window.zIndex,
                top: '10%',
                left: '10%',
            }}
            onPointerDown={() => focusWindow(window.id)}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(20, 20, 20, 0.75)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: window.isMaximized ? 0 : '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive
                        ? '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                        : '0 10px 30px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.2s',
                }}
            >
                {/* Title Bar */}
                <Box
                    onPointerDown={(e) => {
                        dragControls.start(e);
                        focusWindow(window.id);
                    }}
                    sx={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: window.isMaximized ? 'default' : 'grab',
                        '&:active': { cursor: window.isMaximized ? 'default' : 'grabbing' },
                        userSelect: 'none',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0))',
                    }}
                >
                    {/* Window Controls */}
                    <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                        <Box
                            onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(window.id);
                            }}
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: '#FF5F57',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                '&:hover span': { opacity: 1 },
                            }}
                        >
                            <span style={{ opacity: 0, fontSize: 8, fontWeight: 'bold', color: '#330000' }}>×</span>
                        </Box>
                        <Box
                            onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(window.id);
                            }}
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: '#FEBC2E',
                                cursor: 'pointer',
                            }}
                        />
                        <Box
                            onClick={(e) => {
                                e.stopPropagation();
                                maximizeWindow(window.id);
                            }}
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: '#28C840',
                                cursor: 'pointer',
                            }}
                        />
                    </Box>

                    <Typography
                        variant="caption"
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            fontWeight: 600,
                            color: isActive ? 'text.primary' : 'text.secondary',
                            mr: 8, // Balance the controls width
                        }}
                    >
                        {window.title}
                    </Typography>
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {window.component}
                </Box>
            </Box>
        </motion.div>
    );
};
