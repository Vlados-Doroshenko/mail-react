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

    return (
        <div className={classes.menu}>
            {options === 'spam' && <span className='material-icons' onClick={handleInbox}>restore</span>}
            {options === 'trash' && <span className='material-icons' onClick={handleInbox}>restore</span>}
            {options === 'inbox' && <span className='material-icons' onClick={handleSpam}>report</span>}
            {options === 'trash' ?  <span className='material-icons' onClick={handleRemove}>delete</span> : <span className='material-icons' onClick={handleTrash}>delete</span>}
        </div>
    )
};

export default Menu;