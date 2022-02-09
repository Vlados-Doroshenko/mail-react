import React, {useState} from 'react';
import Menu from "../menu/Menu";
import {Link, useParams} from "react-router-dom";
import classes from './content.module.css';

const Content = ({post, remove, spam, restore, options, trash}) => {

    let lengthTitle, lengthDescription  = false;

    const symbolTitle = 10;
    const symbolDescription = 50;

    if (post.title.length > symbolTitle) {
        lengthTitle = !lengthTitle;
    }

    if (post.description.length > symbolDescription) {
        lengthDescription = !lengthDescription;
    }

    return (
        <tr className={classes.letter}>
            <td>
                <input className={classes.letter_input} type='checkbox'/>
            </td>
            <td>
                <Link to={`/${post._id}`}>
                    <h2 className={classes.title}>{post.title.substr(0, symbolTitle)}{lengthTitle && '...'}</h2>
                </Link>
                <span className={classes.description}>{post.description.substr(0, symbolDescription)}{lengthDescription && '...'}</span>
            </td>
            <Menu trash={trash} spam={spam} restore={restore} remove={remove} post={post} options={options}/>
        </tr>
    );
};

export default Content;