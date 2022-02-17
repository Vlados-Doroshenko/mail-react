import React, {useEffect, useState} from 'react';
import Content from "../content/Content";
import classes from './aplication.module.css'
import SettingMenu from "../settingMenu/SettingMenu";
import Pagination from "../pagination/Pagination";

let dataLimit = 10;
const pageLimit = 5;

const Aplication = ({collection, options, update, setUpdate, valueSearch}) => {

    const [data, setData] = useState([]);

    const [multipleCheck, setMultipleCheck] = useState(false);

    const [check, setCheck] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const multipleCheckbox = ({target: {checked}}) => {
        setMultipleCheck(checked);
    };

    useEffect(() => {
        const findMail = async () => {
            if (valueSearch) {
                const items = await collection.find({title: { $regex: valueSearch }, type: `${options}`});
                setData(items);
            } else {
                const items = await collection.find({type: `${options}`});
                setData(items);
            }
        }
        findMail();
    }, []);

    const handleRemoveData = (post) => {
        if (!check.length) {
            setData(data.filter(p => p._id !== post._id));
            collection.deleteOne({_id: post._id});
            setUpdate(!update);
        } else {
            check.forEach(item => {
                if (item._id === post._id) {
                    collection.deleteMany({_id: post._id});
                }
            });
            setUpdate(!update);
        }
    }

    const handleSpam = (index) => {
        if (!check.length) {
            let newData = [];
            data.forEach((a) => {
                if (a === index) {
                    a.type = 'spam';
                }
                newData.push(a);
            });
            setData(newData);
            setUpdate(!update);
            collection.updateOne({_id: index._id}, {
                title: index.title,
                description: index.description,
                type: 'spam',
                cache: options,
                review: index.review
            });
        } else {
            check.forEach(item => {
                if (item._id === index._id) {
                    collection.updateMany({_id: index._id}, {
                        title: index.title,
                        description: index.description,
                        type: 'spam',
                        cache: options,
                        review: index.review
                    });
                }
            });
            setUpdate(!update);
        }
    }

    const handleTrash = (index) => {
        if (!check.length) {
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
        } else {
            check.forEach(item => {
                if (item._id === index._id) {
                    collection.updateMany({_id: index._id}, {
                        title: index.title,
                        description: index.description,
                        type: 'trash',
                        cache: options
                    });
                }
            });
            setUpdate(!update);
        }
    }

    const handleRestore = (index) => {
        if (!check.length) {
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
                type: index.cache,
                review: index.review
            });
        } else {
            check.forEach(item => {
                if (item._id === index._id) {
                    collection.updateMany({_id: index._id}, {
                        title: index.title,
                        description: index.description,
                        type: index.cache,
                        review: index.review
                    });
                }
            });
            setUpdate(!update);
        }
    }

    const handleReview = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'inbox'
                a.review = false
            }
            newData.push(a);
        })
        setData(newData);
        setUpdate(!update);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.type,
            review: true
        });
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const handleNotReview = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.review = true
                a.type = 'inbox'
            }
            newData.push(a);
        })
        setData(newData);
        setUpdate(!update);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.type,
            review: false
        });
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.aplication}>
                {!data.length ?
                    <h1 className={classes.aplication__content}>
                        {options === 'inbox' ? 'The inbox is empty' : ''}
                        {options === 'trash' ? 'The trash is empty' : ''}
                        {options === 'send' ? 'You haven\'t sent any messages yet' : ''}
                        {options === 'spam' ? 'The spam is empty' : ''}
                    </h1>
                    :
                    <table cellSpacing="0">
                        <thead className={classes.table__head}>
                        <tr>
                            <th>
                                <input type='checkbox' checked={multipleCheck} onChange={multipleCheckbox}/>
                            </th>
                            {multipleCheck === false ? '' :
                                <SettingMenu check={check} setCheck={setCheck} options={options}
                                             multipleCheck={multipleCheck} setMultipleCheck={setMultipleCheck} data={data}
                                             collection={collection} spam={handleSpam} trash={handleTrash}
                                             restore={handleRestore} remove={handleRemoveData}/>
                            }
                            {check === false || check[0] === false || check[1] === false ? '' :
                                <SettingMenu check={check} setCheck={setCheck} options={options}
                                             multipleCheck={multipleCheck} setMultipleCheck={setMultipleCheck} data={data}
                                             collection={collection} spam={handleSpam} trash={handleTrash}
                                             restore={handleRestore} remove={handleRemoveData}/>
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            getPaginatedData().map((post, key) =>
                                <Content data={data} key={key} check={check} setCheck={setCheck}
                                         setMultipleCheck={setMultipleCheck} review={handleReview} multipleCheck={multipleCheck}
                                         remove={handleRemoveData} notReview={handleNotReview} spam={handleSpam} trash={handleTrash}
                                         restore={handleRestore} collection={collection}
                                         update={update} setUpdate={setUpdate}
                                         post={post} options={options}/>
                            )
                        }
                        </tbody>
                    </table>
                }
            </div>
            <Pagination data={data} currentPage={currentPage} update={update} setUpdate={setUpdate} setCurrentPage={setCurrentPage} pageLimit={pageLimit} dataLimit={dataLimit}/>
        </div>
    );
};

export default Aplication;
