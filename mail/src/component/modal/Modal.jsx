import React from 'react';
import classNames from "classnames";
import classes from './modal.module.css';
import './modal.module.css';
import ModalForm from "../modalform/ModalForm";
import ReactDOM from "react-dom";


const Modal = ({activeModal, setActive, collection}) => {

    return ReactDOM.createPortal(
        <>
            <div className={activeModal ? classNames(classes.modal, classes.active) : classes.modal}
                 onClick={() => setActive(false)}>
                <div
                    className={activeModal ? classNames(classes.modal__content, classes.active) : classes.modal__content}
                    onClick={e => e.stopPropagation()}>
                    <button className={classes.modal__btn_close} onClick={() => setActive(false)}>
                        <span className="material-icons">cancel</span>
                    </button>
                    <ModalForm setActive={setActive} collection={collection}/>
                </div>
            </div>
        </>,
        document.getElementById('root'),
    );
};

export default Modal;