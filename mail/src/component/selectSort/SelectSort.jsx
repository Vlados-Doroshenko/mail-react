import React from 'react';
import classes from "../select/select.module.css";

const SelectSort = ({setSort, isReload, setIsReload}) => {
    const selectItem = (e) => {
        const {value} = e.target;
        setSort(Number(value));
        setIsReload(!isReload);
    }

    return (
        <select className={classes.select} onChange={selectItem}>
            <option value={1}>
                ASC
            </option>
            <option value={-1}>
                DESC
            </option>
        </select>
    );
};

export default SelectSort;