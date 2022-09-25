import React from 'react';
import Calendar from './Components/Calendar/Calendar';
import Menu from './Components/Menu/Menu';
import './style/App.css';


const defaultLang = navigator.language;
export const LangContext = React.createContext(defaultLang);

function App() {
    return (
        <div className="App">
            <LangContext.Provider value={localStorage.getItem('lang') || defaultLang}>
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
