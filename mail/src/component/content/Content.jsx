import React from 'react';
import Menu from "../menu/Menu";
import {Link} from "react-router-dom";
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
        <tr className='letter'>
            <td className={classes.letter__td}>
                <input className={classes.letter_input} type='checkbox'/>
            </td>
            <td className={classes.letter__td}>
                <div className={classes.info}>
                <Link to={`/${post._id}`}>
                    <h2 className={classes.title}>{post.title.substr(0, symbolTitle)}{lengthTitle && '...'}</h2>
                </Link>
                <span className={classes.description}>{post.description.substr(0, symbolDescription)}{lengthDescription && '...'}</span>
                <Menu trash={trash} spam={spam} restore={restore} remove={remove} post={post} options={options}/>
                </div>
            </td>
        </tr>
    );
};

export default Content;