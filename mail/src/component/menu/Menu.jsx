import React from 'react';
import classes from './menu.module.css';

const Menu = ({remove, post, spam, trash, restore, options, review, notReview}) => {

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

    const handleRestore = (e) => {
        e.stopPropagation();
        e.preventDefault();
        restore(post);
    }

    const handleTrash = (e) => {
        e.stopPropagation();
        e.preventDefault();
        trash(post);
    }

    const handleReview = (e) => {
        e.stopPropagation();
        e.preventDefault();
        review(post);
    }

    const handleNotReview = (e) => {
        e.stopPropagation();
        e.preventDefault();
        notReview(post);
    }

    return (
        <div className='menu'>
            <div></div>
            <div className={classes.setting}>
                {options === 'spam' && <span className='material-icons' onClick={handleRestore}>restore</span>}
                {options === 'trash' && <span className='material-icons' onClick={handleRestore}>restore</span>}
                {options === 'inbox' && <span className='material-icons' onClick={handleSpam}>report</span>}
                {options === 'inbox' && post.review === false &&
                    <span className="material-icons" onClick={handleReview}>visibility</span>}
                {post.type === 'inbox' && post.review === true ?
                    <span className="material-icons" onClick={handleNotReview}>visibility_off</span> : ''}
                {options === 'trash' ? <span className='material-icons' onClick={handleRemove}>delete</span> :
                    <span className='material-icons' onClick={handleTrash}>delete</span>}
            </div>
        </div>
    )
};

export default Menu;