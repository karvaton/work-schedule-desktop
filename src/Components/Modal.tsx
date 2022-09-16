import { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";


const modalRoot = document.getElementById('modal-root');

type ModalType = {
    children: ReactElement | string
}
export default function Modal({ children }: ModalType) {
    const el = document.createElement('div');
    el.classList.add('dialog-wrapper');

    useEffect(() => {
        modalRoot?.appendChild(el);
        return () => {
            modalRoot?.removeChild(el);
        }        
    })

    return ReactDOM.createPortal(children, el);
}
