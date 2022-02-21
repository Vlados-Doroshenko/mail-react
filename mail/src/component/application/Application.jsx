import React, {useEffect, useState} from 'react';
import Content from "../content/Content";
import classes from './application.module.css'
import SettingMenu from "../settingMenu/SettingMenu";
import Pagination from "../pagination/Pagination";

const Application = ({collection, options, valueSearch, setCount}) => {

    const [data, setData] = useState([]);

    const [check, setCheck] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const findMail = async () => {
            if (valueSearch) {
                const items = await collection.find({title: {$regex: valueSearch}, type: `${options}`});
                await setData(items);
            } else {
                const items = await collection.find({type: `${options}`});
                await setData(items);
            }

            if (options === 'inbox') {
                const items = await collection.find({type: 'inbox', review: false});
                items.forEach(item => {
                    if (item.review === false && item.type === 'inbox') {
                        setCount(items.length);
                    }
                });
            }
            setCheck(
                data.map(d => {
                    return {
                        select: false,
                        id: d._id
                    };
                })
            );
        }
        findMail();
    }, []);

    const handleRemoveData = (post) => {
        if (!check.length) {
            setData(data.filter(p => p._id !== post._id));
            collection.deleteOne({_id: post._id});
        } else {
            check.forEach(item => {
                if (item._id === post._id) {
                    collection.deleteMany({_id: post._id});
                }
            });
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
            collection.updateOne({_id: index._id}, {
                title: index.title,
                description: index.description,
                type: 'spam',
                cache: options,
                review: index.review
            });
        } else {
            check.forEach(item => {
                if (item._id === index._id && item.select === true) {
                    collection.updateMany({_id: index._id}, {
                        title: index.title,
                        description: index.description,
                        type: 'spam',
                        cache: options,
                        review: index.review
                    });
                }
            });
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
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.type,
            review: true
        });
    }

    const getPaginatedData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return data.slice(firstPageIndex, lastPageIndex);
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
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.type,
            review: false
        });
    }

    const handleChecked = check.filter(item => item.select);

    return (
        <div className={classes.wrapper}>
            <div className={classes.aplication} style={pageSize > 11 ? {overflowY: "scroll"} : {overflowY: "hidden"}}>
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
                                <input
                                    type="checkbox"
                                    onChange={e => {
                                        let checked = e.target.checked;
                                        setCheck(
                                            data.map(d => {
                                                d.select = checked;
                                                return d;
                                            })
                                        );
                                    }}
                                />
                            </th>
                            {
                                handleChecked.length ? <SettingMenu check={check} setCheck={setCheck} options={options}
                                                                    data={data}
                                                                    collection={collection} spam={handleSpam}
                                                                    trash={handleTrash}
                                                                    restore={handleRestore}
                                                                    remove={handleRemoveData}/> : ''
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            getPaginatedData().map((post, key) =>
                                <Content data={data} key={post._id} setCheck={setCheck}
                                         review={handleReview}
                                         remove={handleRemoveData} notReview={handleNotReview} spam={handleSpam}
                                         trash={handleTrash}
                                         restore={handleRestore} collection={collection}
                                         post={post} options={options}/>
                            )
                        }
                        </tbody>
                    </table>
                }
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
};

export default Application;
