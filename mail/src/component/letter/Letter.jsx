import React, {useEffect, useState} from 'react';
import Menu from "../menu/Menu";
import {Link} from "react-router-dom";
import classes from './letter.module.css';
import classNames from "classnames";

const Letter = ({
                    post,
                    remove,
                    spam,
                    restore,
                    options,
                    trash,
                    setCheck,
                    data,
                    review,
                    notReview,
    addCheckedLetter,
    check
                }) => {

    const handelCheckbox = () => {
        addCheckedLetter(post._id);
    }

    const arrayContains = (word, source_array) => {
        return (source_array.indexOf(word) > -1);
    }

    const [isCheck, setIsCheck] = useState(arrayContains(post._id, check));

    useEffect(() => {
        setIsCheck(arrayContains(post._id, check));
    },[check]);

    return (
        <tr key={post._id} className={post.review === false ? classNames('letter', 'not_review') : 'letter'}>
            <td className={classNames(classes.letter__td, classes.checkbox)}>
                <input className={classes.letter_input}
                       onClick={(e) => e.stopPropagation()}
                       checked={isCheck}
                       onChange={handelCheckbox}
                       type='checkbox'/>
            </td>
            <td className={classes.letter__td}>
                <div className={classes.info}>
                    <Link to={`/${post._id}`}>
                        <h2 className={classes.title}>{post.title}</h2>
                    </Link>
                    <span
                        className={classes.description}>{post.description}</span>
                    <Menu trash={trash} spam={spam} review={review} notReview={notReview} restore={restore}
                          remove={remove} post={post} options={options}/>
                </div>
            </td>
        </tr>
    );
};

export default Letter;