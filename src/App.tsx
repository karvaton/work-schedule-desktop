import React, { useState } from 'react';
import './style/App.css';
import './style/mobile.css';

import Calendar from './Components/Calendar/Calendar';
import Menu from './Components/Menu/Menu';
import useWindowSize from './hooks/useWindowSize';


export const TouchscreenContext = React.createContext(false);

function App() {
    const [width] = useWindowSize();
    const isMobile = width < 720;
    const [opened, toggleOpened] = useState(false);
    
    return (
        <div className={isMobile ? 'App App-mobile' : 'App'}>
            <TouchscreenContext.Provider value={!!('ontouchstart' in window)}>
                <aside>
                    <Menu opened={opened} closeMenuFn={() => toggleOpened(false)} />
                </aside>
                <main>
                    <Calendar openMenuFn={() => toggleOpened(true)}/>
                </main>
            </TouchscreenContext.Provider>
        </div>
    );
}

export default App;
