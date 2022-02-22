import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import classes from './detailletter.module.css';
import {ObjectID} from "bson";

const DetailLetter = ({collection, setCount, count, setIsReload, isReload}) => {
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

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!item.review) {
                collection.updateOne({_id: item._id}, {
                    title: item.title,
                    description: item.description,
                    type: item.type,
                    review: true
                });
                setCount(!count);
                setIsReload(!isReload);
            }
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className={classes.detail}>
            <button type='button' className={classes.detail__btn} onClick={handleBack}>
                <span className="material-icons">arrow_back</span>
            </button>
            <h2 className={classes.title}>{item.title} (type: {item.type})</h2>
            <span>{item.description}</span>
        </div>
    );
};

export default DetailLetter;