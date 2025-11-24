import { createContext, useContext, useState, type ReactNode } from 'react';

export interface AppInstance {
    id: string;
    appId: string;
    title: string;
    icon?: string;
    component: ReactNode;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface WindowContextType {
    windows: AppInstance[];
    activeWindowId: string | null;
    openApp: (appId: string, title: string, component: ReactNode, icon?: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: ReactNode }) => {
    const [windows, setWindows] = useState<AppInstance[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [zIndexCounter, setZIndexCounter] = useState(100);

    const openApp = (appId: string, title: string, component: ReactNode, icon?: string) => {
        // Check if app is already open
        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
            focusWindow(existingWindow.id);
            if (existingWindow.isMinimized) {
                setWindows((prev) =>
                    prev.map((w) => (w.id === existingWindow.id ? { ...w, isMinimized: false } : w))
                );
            }
            return;
        }

        const newWindow: AppInstance = {
            id: Math.random().toString(36).substr(2, 9),
            appId,
            title,
            icon,
            component,
            isMinimized: false,
            isMaximized: false,
            zIndex: zIndexCounter + 1,
        };

        setZIndexCounter((prev) => prev + 1);
        setWindows((prev) => [...prev, newWindow]);
        setActiveWindowId(newWindow.id);
    };

    const closeWindow = (id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const maximizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
        );
        focusWindow(id);
    };

    const focusWindow = (id: string) => {
        setZIndexCounter((prev) => prev + 1);
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w))
        );
        setActiveWindowId(id);
    };

    return (
        <WindowContext.Provider
            value={{
                windows,
                activeWindowId,
                openApp,
                closeWindow,
                minimizeWindow,
                maximizeWindow,
                focusWindow,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};

export const useWindowManager = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindowManager must be used within a WindowProvider');
    }
    return context;
};
