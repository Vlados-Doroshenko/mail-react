import React from 'react';
import classNames from "classnames";
import classes from './modal.module.css'


const Modal = ({visible, children}) => {

    let rootClasses = [classes.modal];

    if(visible){
         rootClasses = classNames(classes.modal, classes.modalActive)
    }else{
         rootClasses = classNames(classes.modal)
    }

    return (
        <div className={rootClasses}>
            <div>
                {children}
            </div>

        </div>
    );
};

export default Modal;