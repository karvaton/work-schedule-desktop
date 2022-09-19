import { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";


const modalRoot = document.getElementById('modal-root');

type ModalType = {
    children: ReactElement | string
    darkBackground?: boolean
    opened?: boolean
}
export default function Modal({ children, darkBackground, opened }: ModalType) {
    if (opened) {
        return <Wrapper darkBackground={darkBackground}>
            {children}
        </Wrapper>
    } else {
        return <></>
    }
}


function Wrapper({children, darkBackground}: ModalType) {
    const el = document.createElement('div');
    el.classList.add('dialog-wrapper');
    if (darkBackground) {
        el.classList.add('dialog-wrapper-darken');
    }

    useEffect(() => {
        modalRoot?.appendChild(el);
        return () => {
            modalRoot?.removeChild(el);
        }
    });

    return ReactDOM.createPortal(children, el);
}