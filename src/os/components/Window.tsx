import { motion, useDragControls } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import { type AppInstance, useWindowManager } from '../context/WindowManager';
import { useState, useEffect, useRef } from 'react';

interface WindowProps {
    window: AppInstance;
}

export const Window = ({ window }: WindowProps) => {
    const theme = useTheme();
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow, activeWindowId } = useWindowManager();
    const dragControls = useDragControls();
    const isActive = activeWindowId === window.id;

    // Resizing State
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number; startWindowX: number; startWindowY: number; direction: string } | null>(null);

    const startResize = (e: React.PointerEvent, direction: string) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        resizeRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startWidth: window.width,
            startHeight: window.height,
            startWindowX: window.x,
            startWindowY: window.y,
            direction
        };
        focusWindow(window.id);
    };

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isResizing || !resizeRef.current) return;

            const { startX, startY, startWidth, startHeight, startWindowX, startWindowY, direction } = resizeRef.current;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newUpdates: Partial<AppInstance> = {};
            const minWidth = 300;
            const minHeight = 200;

            if (direction.includes('e')) {
                newUpdates.width = Math.max(minWidth, startWidth + deltaX);
            }
            if (direction.includes('s')) {
                newUpdates.height = Math.max(minHeight, startHeight + deltaY);
            }
            if (direction.includes('w')) {
                const newWidth = Math.max(minWidth, startWidth - deltaX);
                newUpdates.width = newWidth;
                // Only update X if width actually changed (to prevent drifting when hitting minWidth)
                if (newWidth > minWidth || startWidth > minWidth) {
                    newUpdates.x = startWindowX + (startWidth - newWidth);
                }
            }
            if (direction.includes('n')) {
                const newHeight = Math.max(minHeight, startHeight - deltaY);
                newUpdates.height = newHeight;
                if (newHeight > minHeight || startHeight > minHeight) {
                    newUpdates.y = startWindowY + (startHeight - newHeight);
                }
            }

            updateWindow(window.id, newUpdates);
        };

        const handlePointerUp = () => {
            setIsResizing(false);
            resizeRef.current = null;
        };

        if (isResizing) {
            document.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isResizing, window.id, updateWindow]);

    const ResizeHandle = ({ cursor, direction, style }: { cursor: string; direction: string; style: any }) => (
        <Box
            onPointerDown={(e) => startResize(e, direction)}
            sx={{
                position: 'absolute',
                zIndex: 20,
                cursor,
                touchAction: 'none', // Important for preventing scrolling on touch devices
                ...style,
            }}
        />
    );

    return (
        <motion.div
            drag={!window.isMaximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{
                scale: 0.9,
                opacity: 0,
                x: window.x,
                y: window.y,
                width: window.width,
                height: window.height
            }}
            animate={{
                scale: window.isMinimized ? 0 : window.isMaximized ? 1 : 1,
                opacity: window.isMinimized ? 0 : 1,
                x: window.isMaximized ? 0 : window.x,
                y: window.isMaximized ? 0 : window.isMinimized ? window.y + 200 : window.y,
                width: window.isMaximized ? '100vw' : window.width,
                height: window.isMaximized ? 'calc(100vh - 32px)' : window.height,
                top: window.isMaximized ? 32 : 0,
                left: window.isMaximized ? 0 : 0,
            }}
            onDragEnd={(_, info) => {
                if (!window.isMaximized) {
                    updateWindow(window.id, {
                        x: window.x + info.offset.x,
                        y: window.y + info.offset.y,
                    });
                }
            }}
            style={{
                position: 'absolute',
                zIndex: window.zIndex,
                touchAction: 'none' // Prevent browser handling of gestures
            }}
            onPointerDown={() => focusWindow(window.id)}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'background.paper',
                    backdropFilter: 'blur(20px)',
                    borderRadius: window.isMaximized ? 0 : '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive
                        ? `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${theme.palette.secondary.main}`
                        : '0 10px 30px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.2s',
                    position: 'relative',
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
                        flexShrink: 0,
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
                            mr: 8,
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

                {/* Resize Handles */}
                {!window.isMaximized && (
                    <>
                        {/* Corners */}
                        <ResizeHandle cursor="nw-resize" direction="nw" style={{ top: 0, left: 0, width: 15, height: 15 }} />
                        <ResizeHandle cursor="ne-resize" direction="ne" style={{ top: 0, right: 0, width: 15, height: 15 }} />
                        <ResizeHandle cursor="sw-resize" direction="sw" style={{ bottom: 0, left: 0, width: 15, height: 15 }} />
                        <ResizeHandle cursor="se-resize" direction="se" style={{ bottom: 0, right: 0, width: 15, height: 15 }} />

                        {/* Edges */}
                        <ResizeHandle cursor="n-resize" direction="n" style={{ top: 0, left: 15, right: 15, height: 8 }} />
                        <ResizeHandle cursor="s-resize" direction="s" style={{ bottom: 0, left: 15, right: 15, height: 8 }} />
                        <ResizeHandle cursor="w-resize" direction="w" style={{ left: 0, top: 15, bottom: 15, width: 8 }} />
                        <ResizeHandle cursor="e-resize" direction="e" style={{ right: 0, top: 15, bottom: 15, width: 8 }} />
                    </>
                )}
            </Box>
        </motion.div>
    );
};
