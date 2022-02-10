import React, {useEffect, useState} from 'react';
import Content from "../content/Content";
import classes from './aplication.module.css'


const Aplication = ({collection, options, update, setUpdate}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const find = async () => {
            const items = await collection.find({type: options});
            setData(items);
        }
        find();
    }, []);

    const handleRemoveData = (post) => {
        setData(data.filter(p => p._id !== post._id));
        collection.deleteOne({_id: post._id});
        setUpdate(!update);
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
        setUpdate(!update);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
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
        setUpdate(!update);
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
        setUpdate(!update);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.cache
        });
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