import React, {useEffect, useState} from 'react';
import Letter from "../letter/Letter";
import classes from './application.module.css'
import SettingMenu from "../settingMenu/SettingMenu";
import Pagination from "../pagination/Pagination";

const LetterList = ({collection, options, valueSearch, setCount, count}) => {

    const [data, setData] = useState([]);

    const [check, setCheck] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const getLetters = () => {
        const findMail = async () => {
            if (valueSearch) {
                const items = await collection.find({
                    title: {$regex: valueSearch},
                    type: `${options}`
                }, {limit: pageSize, sort: {_id: -1}});
                await setData(items);
            } else {
                const items = await collection.find({type: `${options}`}, {sort: {_id: -1}});
                await setData(items);
            }

            const items = await collection.find({type: `${options}`}, {sort: {_id: -1}});
            await setData(items);

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
    }

    useEffect(() => {
        getLetters();
    }, [valueSearch, collection, options]);

    const handleRemoveData = async (post) => {
        getLetters();
        if (!check.length) {
            setData(data.filter(p => p._id !== post._id));
            await collection.deleteOne({_id: post._id});
        } else {
            check.forEach(item => {
                if (item._id === post._id) {
                    collection.deleteMany({_id: post._id});
                }
            });
        }
    }

    const handleSpam = async (index) => {
        if (!check.length) {
            let newData = [];
            data.forEach((a) => {
                if (a === index) {
                    a.type = 'spam';
                }
                newData.push(a);
            });
            setData(newData);
            await collection.updateOne({_id: index._id}, {
                title: index.title,
                description: index.description,
                type: 'spam',
                cache: options,
                review: index.review
            });
            getLetters();

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
                    getLetters();
                }
            });
        }
    }

    const handleTrash = async (index) => {
        if (!check.length) {
            let newData = []
            data.forEach((a) => {
                if (a === index) {
                    a.type = 'trash';
                }
                newData.push(a);
            })
            setData(newData);
            await collection.updateOne({_id: index._id}, {
                title: index.title,
                description: index.description,
                type: 'trash',
                cache: options
            });
            getLetters();
        } else {
            check.forEach(item => {
                if (item._id === index._id && item.select === true) {
                    collection.updateMany({_id: index._id}, {
                        title: index.title,
                        description: index.description,
                        type: 'trash',
                        cache: options
                    });
                    getLetters();
                }
            });
        }
    }

    const handleRestore = async (index) => {
        if (!check.length) {
            let newData = [];
            data.forEach((a) => {
                if (a === index) {
                    a.where = index.where;
                }
                newData.push(a);
            })
            setData(newData);
            await collection.updateOne({_id: index._id}, {
                title: index.title,
                description: index.description,
                type: index.cache,
                review: index.review
            });
            getLetters();
        } else if (options === 'send') {
            let newData = [];
            data.forEach((a) => {
                if (a === index) {
                    a.where = index.where;
                    a.type = 'send'
                }
                newData.push(a);
            })
            setData(newData);
            await collection.updateOne({_id: index._id}, {
                title: index.title,
                description: index.description,
                type: index.cache
            });
        } else {
            check.forEach(item => {
                if (item._id === index._id && item.select === true) {
                    collection.updateMany({_id: index._id}, {
                        title: index.title,
                        description: index.description,
                        type: index.cache,
                        review: index.review
                    });
                    getLetters();
                }
            });
        }
    }

    const handleReview = async (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'inbox'
                a.review = false
            }
            newData.push(a);
        })
        setData(newData);
        await collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.type,
            review: true
        });
        getLetters();
        setCount(!count);
    }

    const getPaginatedData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    };

    const handleNotReview = async (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.review = true
                a.type = 'inbox'
            }
            newData.push(a);
        })
        setData(newData);
        await collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.type,
            review: false
        });
        getLetters();
        setCount(!count);
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
                                <Letter data={data} key={post._id} setCheck={setCheck}
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

export default LetterList;
