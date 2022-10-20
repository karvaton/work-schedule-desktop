import React, { useState } from 'react';
import './style/App.css';
import './style/mobile.css';

import Calendar from './Components/Calendar/Calendar';
import Menu from './Components/Menu/Menu';
import useWindowSize from './hooks/useWindowSize';


export const TouchscreenContext = React.createContext(false);

function App() {
    const isTouchScreen = !!('ontouchstart' in window);
    const [width] = useWindowSize();
    const isMobile = width < 720;
    const [menuOpenedValue, toggleMenu] = useState<number>(0);
    const [menuStartOpenedValue, setMenuStartOpenedValue] = useState<number>(menuOpenedValue);
    const [moveStartX, setMoveStartX] = useState<number>(0);
    const [isDrag, setDrag] = useState<boolean>(false);
    const [transparent, setTransparent] = useState<number>(0);

    function getMove(start: number, end: number) {
        const d = ((start - end)/width) * 100;
        const opened = menuStartOpenedValue - d;
        const transparent = (menuStartOpenedValue - d) / 100;
        toggleMenu(opened > 100 ? 100 : opened > 0 ? opened : 0);
        setTransparent(transparent > .4 ? .4 : transparent > 0 ? transparent : 0);
    }

    function openMenu() {
        setTransparent(.4);
        toggleMenu(100);
    }

    function closeMenu() {
        setTransparent(0);
        toggleMenu(0);
    }

    function startDrag(e: React.PointerEvent<HTMLElement>) {
        setDrag(true);
        setMoveStartX(e.clientX);
        setMenuStartOpenedValue(menuOpenedValue);
    }

    function dragging(e: React.PointerEvent<HTMLElement>) {
        getMove(moveStartX, e.clientX);
    }

    function finishDrag(e: React.PointerEvent<HTMLElement>, d = .5) {
        if ((e.clientX - moveStartX) / width > d) {
            openMenu();
        } else {
            closeMenu();
        }
        setDrag(false);
        setMoveStartX(0);
        setMenuStartOpenedValue(menuOpenedValue);
    }
    
    return (
        <div
            className={isMobile ? 'App App-mobile' : 'App'}
        >
            <TouchscreenContext.Provider value={isTouchScreen}>
                <aside>
                    <Menu
                        openedValue={isMobile ? menuOpenedValue : 100}
                        closeMenu={closeMenu}
                        isDrag={isDrag}
                        transparent={transparent} 
                        startDrag={startDrag}
                        dragging={dragging}
                        finishDrag={finishDrag}
                    />
                </aside>
                <main
                    onPointerDown={e => isTouchScreen && startDrag(e)}
                    onPointerMove={e => isTouchScreen && isDrag && dragging(e)}
                    onPointerUp={e => finishDrag(e)}
                >
                    <Calendar openMenu={openMenu}/>
                </main>
            </TouchscreenContext.Provider>
        </div>
    );
}

export default App;
