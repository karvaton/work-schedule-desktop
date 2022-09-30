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
    const [open, changeOpen] = useState<number>(0);
    const [moveStartX, setMoveStartX] = useState<number>(0);
    const [isDrag, setDrag] = useState<boolean>(false);
    const [transparent, setTransparent] = useState<number>(0);

    function getMove(start: number, end: number) {
        const d = (end - start)/width;
        setTransparent(d > 0.4 ? 0.4 : d > 0 ? d : 0);
        changeOpen(d > 1 ? 100 : d > 0 ? Math.floor(d*100) : 0);
    }

    function openMenu() {
        setTransparent(.4);
        changeOpen(100);
    }

    function closeMenu() {
        setTransparent(0);
        changeOpen(0);
    }
    
    return (
        <div
            className={isMobile ? 'App App-mobile' : 'App'}
        >
            <TouchscreenContext.Provider value={isTouchScreen}>
                <aside>
                    {(isTouchScreen) ? (
                        <div
                            className="menu-wrapper"
                            onClick={closeMenu}
                            style={{ 
                                zIndex: transparent ? '2' : '-1',
                                backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                            }}
                            onPointerDown={e => {
                                if (isTouchScreen) {
                                    setDrag(true);
                                    setMoveStartX(e.clientX);
                                }
                            }}
                            onPointerUp={() => {
                                setDrag(false);
                                setMoveStartX(0);
                            }}
                        ></div>
                    ) : null}
                    <Menu
                        opened={isMobile ? open : 100}
                        closeMenuFn={closeMenu}
                        openMenuFn={openMenu}
                        setDrag={(value) => setDrag(value)}
                        setMoveStartX={(value) => setMoveStartX(value)}
                        isDrag={isDrag}
                        moveStart={moveStartX}
                        changeOpen={value => changeOpen(value)} 
                        setTransparent={value => setTransparent(value)} 
                    />
                </aside>
                <main
                    onPointerDown={e => {
                        if (isTouchScreen) {
                            setDrag(true);
                            setMoveStartX(e.clientX);
                        }
                    }}
                    onPointerMove={e => isTouchScreen && isDrag && getMove(moveStartX, e.clientX)}
                    onPointerUp={e => {
                        if ((e.clientX - moveStartX)/width > .5) {
                            openMenu();
                        } else {
                            closeMenu();
                        }
                        setDrag(false);
                        setMoveStartX(0);
                    }}
                >
                    <Calendar openMenuFn={() => openMenu()}/>
                </main>
            </TouchscreenContext.Provider>
        </div>
    );
}

export default App;
