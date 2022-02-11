import React from 'react';
import classes from './settingmenu.module.css';

const SettingMenu = ({spam, restore, trash, data, check, options, remove}) => {

    const multipleSpam = (e) => {
        e.preventDefault();
        e.stopPropagation();
        data.forEach(item => {
            if (check === true) {
                spam(item);
            }
        });
    }

    const multipleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        data.forEach(item => {
            if (check === true) {
                remove(item);
            }
        });
    }

    const multipleRestore = (e) => {
        e.stopPropagation();
        e.preventDefault();
        data.forEach(item => {
            if (check === true) {
                restore(item);
            }
        });
    }

    const multipleTrash = (e) => {
        e.stopPropagation();
        e.preventDefault();
        data.forEach(item => {
            if (check === true) {
                trash(item);
            }
        });
    }

    return (
        <th className={classes.setting}>
            <div>
                {options === 'spam' && <span className='material-icons' onClick={multipleRestore}>restore</span>}
                {options === 'trash' && <span className='material-icons' onClick={multipleRestore}>restore</span>}
                {options === 'inbox' && <span className='material-icons' onClick={multipleSpam}>report</span>}
                {options === 'trash' ? <span className='material-icons' onClick={multipleRemove}>delete</span> :
                <span className='material-icons' onClick={multipleTrash}>delete</span>
                }
            </div>
        </th>
    );
};

export default SettingMenu;