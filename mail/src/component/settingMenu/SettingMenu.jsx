import React from 'react';
import classes from './settingmenu.module.css';

const SettingMenu = ({spam, restore, trash, data, options, remove, check, setCheck}) => {

    const multipleSpam = (e) => {
        e.preventDefault();
        e.stopPropagation();
        data.forEach(item => {
            check.forEach(checkbox => {
                if(item._id === checkbox._id) {
                    spam(checkbox);
                }
            });
        });
    }

    const multipleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        data.forEach(item => {
            check.forEach(checkbox => {
                if(item._id === checkbox._id) {
                    remove(checkbox);
                }
            });
        });
    }

    const multipleRestore = (e) => {
        e.stopPropagation();
        e.preventDefault();
        data.forEach(item => {
            check.forEach(checkbox => {
                if(item._id === checkbox._id) {
                    restore(checkbox);
                }
            });
        });
    }

    const multipleTrash = (e) => {
        e.stopPropagation();
        e.preventDefault();
        data.forEach(item => {
            check.forEach(checkbox => {
                if(item._id === checkbox._id) {
                    trash(checkbox);
                }
            });
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