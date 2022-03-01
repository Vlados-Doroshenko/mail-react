import React, {useEffect, useState} from 'react';
import Letter from "../letter/Letter";
import classes from './letterlist.module.css'
import SettingMenu from "../settingMenu/SettingMenu";
import Pagination from "../pagination/Pagination";

const LetterList = ({collection, options, valueSearch, setCount, count, setIsReload, isReload}) => {

    const [data, setData] = useState([]);

    const [check, setCheck] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(15);

    const [isSort, setIsSort] = useState(1);

    const getAll = () => {
        const findMail = async () => {
            if (valueSearch) {
                const items = await collection.find({
                    title: {$regex: valueSearch},
                    type: `${options}`
                }, {limit: pageSize, sort: {_id: -1}});
                await setData(items);
            } else {
                const items = await collection.find({type: `${options}`}, {sort: {_id: isSort}});
                await setData(items);
            }
        }
        findMail();
        setCheck([]);
        setCurrentPage(1);
    }

    useEffect(() => {
        getAll();
    }, [isReload, valueSearch, collection, options, isSort, pageSize]);

    const handleRemoveData = async (post) => {
        setData(data.filter(p => p._id !== post._id));
        await collection.deleteOne({_id: post._id});
        getAll();
    }

    const handleSpam = async (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'spam';
            }
            newData.push(a);
        });
        await collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: 'spam',
            cache: options,
            review: index.review
        });
        setData(newData);
        getAll();
    }

    const handleTrash = async (index) => {
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
        getAll();
    }

    const handleRestore = async (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.where = index.where;
            }
            newData.push(a);
        })
        await collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: index.cache,
            review: index.review
        });
        getAll();
        setData(newData);

        if (options === 'send') {
            let newData = [];
            data.forEach((a) => {
                if (a === index) {
                    a.cache = index.cache;
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
            getAll();
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
        getAll();
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
        getAll();
        setCount(!count);
    }

    const handleCheckBox = (item, index) => {
        return (index.indexOf(item) > -1);
    }

    const addCheckedLetter = (e) => {
        if (handleCheckBox(e, check)) {
            let add = (check.filter((item) => {
                return item !== e;
            }))
            setCheck(add);
        } else {
            let add = [...check, e];
            setCheck(add);
        }
        if (e === true) {
            setCheck([]);
        }
    }

    const handleChecked = (e) => {
        if (e) {
            data.map(e => setCheck((check) => [...check, e._id]));
        } else {
            setCheck([]);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.aplication}
                 style={pageSize < 11 || data.length < 10 ? {overflowY: "hidden"} : {overflowY: "scroll"}}>
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
                                    onChange={(e) => handleChecked(e.target.checked)}
                                    checked={check.length !== data.length ? false : true}
                                />
                            </th>
                            {
                                check.length ? <SettingMenu check={check} setCheck={setCheck} options={options}
                                                            data={data} getAll={getAll}
                                                            collection={collection}/> : ''
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            getPaginatedData().map((post, key) =>
                                <Letter data={data} key={post._id} setCheck={setCheck}
                                        review={handleReview} check={check}
                                        remove={handleRemoveData} notReview={handleNotReview} spam={handleSpam}
                                        trash={handleTrash}
                                        addCheckedLetter={addCheckedLetter}
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
                setSort={setIsSort}
                isReload={isReload} setIsReload={setIsReload}
                setCurrentPage={setCurrentPage}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
};

export default LetterList;