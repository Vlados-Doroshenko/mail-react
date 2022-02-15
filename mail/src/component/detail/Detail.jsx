import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import classes from './detail.module.css';
import {ObjectID} from "bson";

const Detail = ({collection, update, setUpdate}) => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [item, setItem] = useState({});

    useEffect(() => {
        const find = async () => {
            const items = await collection.findOne({_id: ObjectID(id)});
            setItem(items);
        }
        find();
    }, []);

    const handleReview = () => {
        collection.updateOne({_id: item._id}, {
            title: item.title,
            description: item.description,
            type: item.type,
            review: true
        });
        navigate(-1);
        setUpdate(!update);
    }

    return (
        <div className={classes.detail}>
            <button type='button' className={classes.detail__btn} onClick={handleReview}>
                <span className="material-icons">arrow_back</span>
            </button>
            <h2 className={classes.title}>{item.title} (type: {item.type})</h2>
            <span>{item.description}</span>
        </div>
    );
};

export default Detail;