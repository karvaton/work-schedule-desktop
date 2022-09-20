import { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";


const modalRoot = document.getElementById('modal-root');

export type Offset = {
    top: number
    left: number
}

type ContextMenuType = {
    children: ReactElement | string
    offset: Offset
}
export default function ContextMenu({ children, offset }: ContextMenuType) {
    const el = document.createElement('div');
    el.classList.add('context-menu-container');
    el.style.top = offset.top + 'px';
    el.style.left = offset.left + 'px';

    useEffect(() => {
        modalRoot?.appendChild(el);
        return () => {
            modalRoot?.removeChild(el);
        }
    });

    return ReactDOM.createPortal(children, el);
}