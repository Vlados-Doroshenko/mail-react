import React, {useState} from 'react';
import Menu from "../menu/Menu";
import {Link} from "react-router-dom";
import classes from './content.module.css';
import classNames from "classnames";

const Content = ({post, remove, spam, restore, options, trash, multipleCheck, setMultipleCheck, check, setCheck, collection, data}) => {

    let lengthTitle, lengthDescription = false;

    const symbolTitle = 10;
    const symbolDescription = 110;

    if (post.title.length > symbolTitle) {
        lengthTitle = !lengthTitle;
    }

    if (post.description.length > symbolDescription) {
        lengthDescription = !lengthDescription;
    }

    const handleOnChange = (e) => {
        const {name, checked} = e.target;
        const updatedCheckedState = data.map((item) =>
            item._id == name ? item : checked
        );
        setCheck(updatedCheckedState);
    };

    return (
        <tr className='letter'>
            <td className={classNames(classes.letter__td, classes.checkbox)}>
                {multipleCheck === false ?
                    <input className={classes.letter_input} name={post._id} checked={setCheck[check]} onChange={handleOnChange}
                           type='checkbox'/> :
                    <input className={classes.letter_input} checked={multipleCheck} onChange={setMultipleCheck}
                           type='checkbox'/>
                }
            </td>
            <td className={classes.letter__td}>
                <div className={classes.info}>
                    <Link to={`/${post._id}`}>
                        <h2 className={classes.title}>{post.title.substr(0, symbolTitle)}{lengthTitle && '...'}</h2>
                    </Link>
                    <span
                        className={classes.description}>{post.description.substr(0, symbolDescription)}{lengthDescription && '...'}</span>
                    <Menu trash={trash} spam={spam} restore={restore} remove={remove} post={post} options={options}/>
                </div>
            </td>
        </tr>
    );
};

export default Content;