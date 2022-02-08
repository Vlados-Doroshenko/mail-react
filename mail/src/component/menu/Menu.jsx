import React from 'react';
import classes from './menu.module.css';

const Menu = ({remove, post, spam, trash, inbox, options}) => {

    const handleRemove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        remove(post);
    }

    const handleSpam = (e) => {
        e.stopPropagation();
        e.preventDefault();
        spam(post);
    }

    const handleInbox = (e) => {
        e.stopPropagation();
        e.preventDefault();
        inbox(post);
    }

    const handleTrash = (e) => {
        e.stopPropagation();
        e.preventDefault();
        trash(post);
    }

    if (options === 'inbox') {
        return (
            <td className={classes.menu}>
                <span className='material-icons' onClick={handleSpam}>report</span>
                <span className='material-icons' onClick={handleTrash}>delete</span>
            </td>
        )
    } else if (options === 'spam') {
        return (
            <td className={classes.menu}>
                <span className='material-icons' onClick={handleInbox}>inbox</span>
                <span className='material-icons' onClick={handleTrash}>delete</span>
            </td>
        )
    } else if (options === 'send') {
        return (
            <td className={classes.menu}>
                <span className='material-icons' onClick={handleTrash}>delete</span>
            </td>
        )
    } else {
        return (
            <td className={classes.menu}>
                <span className='material-icons' onClick={handleInbox}>inbox</span>
                <span className='material-icons' onClick={handleSpam}>report</span>
                <span className='material-icons' onClick={handleRemove}>delete</span>
            </td>
        )
    }
};

export default Menu;