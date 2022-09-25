import React from 'react';
import './style/App.css';

import Calendar from './Components/Calendar/Calendar';
import Menu from './Components/Menu/Menu';


const defaultLang = localStorage.getItem('lang') || navigator.language || 'en-US';
export const LangContext = React.createContext(defaultLang);

function App() {
    return (
        <div className="App">
            <LangContext.Provider value={defaultLang}>
                <aside>
                    <Menu />
                </aside>
                <main>
                    <Calendar />
                </main>
            </LangContext.Provider>
        </div>
    );
}

export default App;
