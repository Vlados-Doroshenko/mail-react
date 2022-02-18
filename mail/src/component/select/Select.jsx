import React from 'react';
import classes from './select.module.css';

const Select = ({setPageSize, setCurrentPage, setUpdate, update}) => {

    const selectItem = (e) => {
        const {value} = e.target;
        if (value === '10') {
            setUpdate(!update);
        }
        setPageSize(value);
        setCurrentPage(1);
    }

    return (
        <select className={classes.select} onChange={selectItem}>
            <option value={10}>
                10
            </option>
            <option value={25}>
                25
            </option>
            <option value={50}>
                50
            </option>
        </select>
    );
};

export default Select;
