import React from 'react';
import classNames from "classnames";
import classes from './modal.module.css';
import './modal.module.css';
import ModalForm from "../modalform/ModalForm";


const Modal = ({activeModal, setActive, collection, setUpdate, update}) => {

    return (
        <div className={activeModal ? classNames(classes.modal, classes.active) : classes.modal}
             onClick={() => setActive(false)}>
            <div className={activeModal ? classNames(classes.modal__content, classes.active) : classes.modal__content}
                 onClick={e => e.stopPropagation()}>
                <button className={classes.modal__btn_close} onClick={() => setActive(false)}>
                    <span className="material-icons">cancel</span>
                </button>
                <ModalForm setUpdate={setUpdate} update={update} setActive={setActive} collection={collection}/>
            </div>
        </div>
    );
};

export default Modal;