import React from 'react';
import Menu from "../menu/Menu";
import {Link} from "react-router-dom";
import classes from './content.module.css';

const Content = ({post, remove, spam, inbox, checkbox, options, trash}) => {

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
                <input className={classes.letter_input} type='checkbox' checked={post.checkbox} onClick={()=> checkbox(post)}/>
            </td>
            <td>
                <Link to={`/${post._id}`}>
                    <h2 className={classes.title}>{post.title.substr(0, symbolTitle)}{lengthTitle && '...'}</h2>
                </Link>
            </td>
            <td>
                <span className={classes.description}>{post.description.substr(0, symbolDescription)}{lengthDescription && '...'}</span>
            </td>
            <Menu remove={remove} post={post} spam={spam} trash={trash} checkbox={checkbox} inbox={inbox} options={options}/>
        </tr>
    );
};

export default Content;