import React, {useState} from 'react';
import Content from "../content/Content";
import classes from './aplication.module.css'

const Aplication = ({collection, data, options, setData}) => {

    const handleRemoveData = (post) => {
        setData(data.filter(p => p._id !== post._id));
        collection.deleteOne({_id: post._id});
    }

    const handleSpam = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'spam';
            }
            newData.push(a);
        })
        setData(newData);
        collection.updateOne({_id: data._id}, {
            title: data.title,
            description: data.description,
            type: 'spam',
            cache: options
        });
    }

    const handleTrash = (index) => {
        let newData = []
        data.forEach((a) => {
            if (a === index) {
                a.type = 'trash';
            }
            newData.push(a);
        })
        setData(newData);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: 'trash',
            cache: options
        });
    }

    const handleRestore = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.where = index.where;
            }
            newData.push(a);
        })
        setData(newData);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.cache
        });
    }

    const multipleSpam = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'spam';
            }
            newData.push(a);
        })
        setData(newData);
        // setUpdate(!update);
        // setSetting(index.checkbox);
    }

    const multipleTrash = (index) => {
        let newData = []
        data.forEach((a) => {
            if (a === index) {
                a.type = 'trash';
            }
            newData.push(a);
        })
        setData(newData);
        // setUpdate(!update);
        // setSetting(index.checkbox);
    }

    const multipleInbox = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'inbox';
            }
            newData.push(a);
        })
        setData(newData);
        // setUpdate(!update);
        // setSetting(index.checkbox);
    }

    return (
        <div className={classes.aplication}>
            {!data.length ?
            <h1 className={classes.aplication__content}>
                {options === 'inbox' ? 'The inbox is empty' : ''}
                {options === 'trash' ? 'The trash is empty' : ''}
                {options === 'send' ? 'You haven\'t sent any messages yet' : ''}
                {options === 'spam' ? 'The spam is empty' : ''}
            </h1>
                :
            <table cellspacing="0">
                <thead>
                <tr>
                    <th>
                        <input type='checkbox'/>
                    </th>
                    <th>Title</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((post) =>
                        post.type === options &&
                        <Content remove={handleRemoveData} spam={handleSpam} trash={handleTrash}
                                 restore={handleRestore}
                                 post={post} options={options}/>
                    )
                }
                </tbody>
            </table>
            }
        </div>
)
    ;
};

export default Aplication;