import { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";


const modalRoot = document.getElementById('modal-root');

export type Offset = {
    top: number
    left: number
}

type ContextMenuType = {
    children: ReactElement | string
    offset: Offset,
    close: () => void
}
export default function ContextMenu({ children, offset, close }: ContextMenuType) {
    const el = document.createElement('div');
    const childEl = document.createElement('div');
    el.classList.add('context-menu-wrapper');
    el.appendChild(childEl);
    el.addEventListener('mousedown', close);
    el.addEventListener('pointerdown', close);
    childEl.classList.add('context-menu-container');

    childEl.style.top = offset.top + 'px';
    childEl.style.left = offset.left + 'px';
    if (window.innerWidth - 180 < offset.left) {
        childEl.style.left = window.innerWidth - 180 + 'px';
    }
    
    useEffect(() => {
        modalRoot?.appendChild(el);
        return () => {
            modalRoot?.removeChild(el);
        }
    });

    return ReactDOM.createPortal(children, childEl);
}