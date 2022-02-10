import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from './detail.module.css';
import {ObjectID} from "bson";

const Detail = ({collection}) => {
    const {id} = useParams();

    const [item, setItem] = useState({});

    useEffect(() => {
        const find = async () => {
            const items = await collection.findOne({_id: ObjectID(id)});
            setItem(items);
        }
        find();
    }, []);

    return (
        <div className={classes.detail}>
            <h2 className={classes.title}>{item.title}</h2>
            <span>{item.description}</span>
        </div>
    );
};

export default Detail;