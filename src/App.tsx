import { createContext, useState } from 'react';
import './style/App.css';
import './style/mobile.css';

import Header from './Components/Header';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuDrawer from './Components/Menu/Menu';
import Main from './Components/Main';


export const lang = localStorage.getItem('lang') || navigator.language || 'en-US';

export const TouchscreenContext = createContext(false);
export const LocaleContext = createContext({ locale: lang, setLocale: (val: string) => {}});

function App() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [locale, setLocale] = useState<string>(lang);

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header openMenu={() => setMenuOpen(!menuOpen)} />
                <MenuDrawer open={menuOpen} setOpen={setMenuOpen} />
                <Main />
            </Box>
        </LocaleContext.Provider>
    );
}

export default App;
