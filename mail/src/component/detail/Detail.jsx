import React from 'react';
import {useParams} from "react-router-dom";
import classes from './detail.module.css';

const Detail = ({data}) => {
    const {id} = useParams();
    const info = data.find((item) => item._id === id);

    return (
        <div>
            <h2 className={classes.title}>{info.title}</h2>
            <span className={classes.subtitle}>{info.description}</span>
        </div>
    );
};

export default Detail;