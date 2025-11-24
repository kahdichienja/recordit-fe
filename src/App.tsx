import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { WindowProvider } from './os/context/WindowManager';
import { Desktop } from './os/Desktop';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <WindowProvider>
                <Desktop />
            </WindowProvider>
        </ThemeProvider>
    );
}

export default App;
