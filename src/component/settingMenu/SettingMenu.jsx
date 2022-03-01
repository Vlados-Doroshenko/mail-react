import React from 'react';
import classes from './settingmenu.module.css';

const SettingMenu = ({data, collection, check, setCheck, getAll, options}) => {

    const multipleSpam = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await collection.updateMany({_id: {$in: check}}, {
            $set: {
                type: 'spam',
                cache: options
            }
        });
        setCheck([]);
        getAll();
    }

    const multipleRemove = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await collection.deleteMany({_id: {$in: check}});
        setCheck([]);
        getAll();
    }

    const multipleRestore = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        for (const items of data) {
            for (const item of check) {
                if (items._id == item) {
                    await collection.updateMany({_id: items._id}, {
                        title: items.title,
                        description: items.description,
                        type: items.cache,
                        review: items.review
                    });
                }
            }
        }
        setCheck([]);
        getAll();
    }

    const multipleTrash = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await collection.updateMany({_id: {$in: check}}, {
            $set: {
                type: 'trash',
                cache: options
            }
        });
        setCheck([]);
        getAll();
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