import { Box, Tooltip } from '@mui/material';
import { useWindowManager } from '../context/WindowManager';
import type { ReactNode } from 'react';

interface AppDefinition {
    id: string;
    title: string;
    icon: ReactNode;
    component: ReactNode;
}

interface DockProps {
    apps: AppDefinition[];
}

export const Dock = ({ apps }: DockProps) => {
    const { openApp, windows } = useWindowManager();

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10000,
                display: 'flex',
                gap: 2,
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
        >
            {apps.map((app) => {
                const isOpen = windows.some((w) => w.appId === app.id);
                return (
                    <DockItem
                        key={app.id}
                        app={app}
                        isOpen={isOpen}
                        onClick={() => openApp(app.id, app.title, app.component)}
                    />
                );
            })}
        </Box>
    );
};

const DockItem = ({ app, isOpen, onClick }: any) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.2) translateY(-10px)',
                },
            }}
        >
            <Box
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    mb: 1,
                }}
            >
                {/* Tooltip on hover shows name */}
                <Tooltip title={app.title} placement="top">
                    {app.icon}
                </Tooltip>

            </Box>
            {isOpen && (
                <Box
                    sx={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        position: 'absolute',
                        bottom: -6,
                    }}
                />
            )}
        </Box>
    );
};
