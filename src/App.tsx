import React from 'react';
import Calendar from './Components/Calendar/Calendar';
import Menu from './Components/Menu';
import './style/App.css';


function App() {
    return (
        <div className="App">
            <aside>
                <Menu />
            </aside>
            <main>
                <Calendar />
            </main>
        </div>
    );
}

export default App;
