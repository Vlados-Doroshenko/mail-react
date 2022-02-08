import React from 'react';
import classes from './settingmenu.module.css';

const SettingMenu = ({spam, inbox, trash, post, collection}) => {

    const multipleSpam = (e) => {
        e.preventDefault();
        e.stopPropagation();
        post.forEach(item => {
            if (item.checkbox === true) {
                spam(item);
                collection.updateMany({_id: item._id}, {title: item.title, description: item.description, type: 'spam', checkbox: false});
            }
        });
    }

    const multipleInbox = (e) => {
        e.stopPropagation();
        e.preventDefault();
        post.forEach(item => {
            if (item.checkbox === true) {
                inbox(item);
                collection.updateMany({_id: item._id}, {title: item.title, description: item.description, type: 'inbox', checkbox: false});
            }
        });
    }

    const multipleTrash = (e) => {
        e.stopPropagation();
        e.preventDefault();
        post.forEach(item => {
            if (item.checkbox === true) {
                trash(item);
                collection.updateMany({_id: item._id}, {title: item.title, description: item.description, type: 'trash', checkbox: false});
            }
        });
    }

    return (
        <div className={classes.setting}>
            <div>
                <span className='material-icons' onClick={multipleInbox}>inbox</span>
                <span className='material-icons' onClick={multipleSpam}>report</span>
                <span className='material-icons' onClick={multipleTrash}>delete</span>
            </div>
        </div>
    );
};

export default SettingMenu;