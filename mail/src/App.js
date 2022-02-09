import React, {useEffect, useState} from "react";
import * as Realm from "realm-web";
import Header from "./component/header/Header";
import Aplication from "./component/aplication/Aplication";
import Modal from "./component/modal/Modal";
import ModalForm from "./component/modalform/ModalForm";
import Loader from "./component/Loader";
import Detail from "./component/detail/Detail";
import {API_KEY, SERVICE_NAME, DATABASE_NAME, COLLECTION_NAME, app} from "./connect/MongoDB";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SettingMenu from "./component/settingMenu/SettingMenu";
import './index.css';
import 'materialize-css';

const App = () => {
    const [data, setData] = useState([]);

    const [collection, setCollection] = useState(null);

    const [update, setUpdate] = useState(true);

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const login = async () => {
            setLoader(true);
            await app.logIn(Realm.Credentials.apiKey(API_KEY));
            const client = app.currentUser.mongoClient(SERVICE_NAME);
            const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
            setCollection(collection);
            const items = await collection.find();
            setData(items);

            await setLoader(false);
        }
        login();
    }, [update]);

    const [modal, setModal] = useState(false);

    const [active, setActive] = useState(false);

    const [setting, setSetting] = useState(true);

    // handleRemoveData
    const removeData = (post) => {
        setData(data.filter(p => p._id !== post._id));
        collection.deleteOne({_id: post._id});
    }


    const spam = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'spam';
            }
            newData.push(a);
        })
        setData(newData);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: 'spam',
            checkbox: index.checkbox
        });
    }

    const trash = (index) => {
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
            checkbox: index.checkbox
        });
    }

    const inbox = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'inbox';
            }
            newData.push(a);
        })
        setData(newData);
        collection.updateOne({_id: index._id}, {
            title: index.title,
            description: index.description,
            type: 'inbox',
            checkbox: index.checkbox
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
        setUpdate(!update);
        setSetting(index.checkbox);
    }

    const multipleTrash = (index) => {
        let newData = []
        data.forEach((a) => {
            if (a === index) {
                a.type = 'trash';
                a.checkbox = true;
            }
            newData.push(a);
        })
        setData(newData);
        setUpdate(!update);
        setSetting(index.checkbox);
    }

    const multipleInbox = (index) => {
        let newData = [];
        data.forEach((a) => {
            if (a === index) {
                a.type = 'inbox';
                a.checkbox = true;
            }
            newData.push(a);
        })
        setData(newData);
        setUpdate(!update);
        setSetting(index.checkbox);
    }

    const sendMail = (newMail) => {
        setData([...data, newMail]);
        setUpdate(!update);
        setModal(false);
    }

    const visible = () => {
        setModal(true);
    }

    if (loader) {
        return <Loader/>
    } else {

        return (
            <div>
                <BrowserRouter>
                    <Modal visible={modal}>
                        <ModalForm sendMail={sendMail} modal={setModal} collection={collection}/>
                    </Modal>
                    <Header visible={visible}/>
                    {setting ? '' :
                        <SettingMenu collection={collection} post={data.map((post) => post)} spam={multipleSpam}
                                     trash={multipleTrash}
                                     inbox={multipleInbox}/>}
                    <Routes>
                        <Route path="/inbox" className={active ? 'active' : ''} onClick={() => setActive(false)}
                               element={<Aplication data={data.filter(p => p.type === 'inbox')} spam={spam}
                                                    collection={collection}
                                                    trash={trash} options={'inbox'}/>}/>
                        <Route path="/send" className={active ? 'active' : ''} onClick={() => setActive(false)}
                               element={<Aplication data={data.filter(p => p.type === 'send')} collection={collection}
                                                    trash={trash} options={'send'}/>}/>
                        <Route path="/spam" className={active ? 'active' : ''} onClick={() => setActive(false)}
                               element={<Aplication data={data.filter(p => p.type === 'spam')} collection={collection}
                                                    trash={trash} inbox={inbox}
                                                    options={'spam'}/>}/>
                        <Route path="/trash" className={active ? 'active' : ''} onClick={() => setActive(false)}
                               element={<Aplication data={data.filter(p => p.type === 'trash')} collection={collection}
                                                    remove={removeData} spam={spam} inbox={inbox}
                                                    options={'trash'}/>}/>
                        <Route path="/"
                               element={<Aplication data={data.filter(p => p.type === 'inbox')} spam={spam}
                                                    collection={collection}
                                                    trash={trash} options={'inbox'}/>}/>
                        <Route path="/:id" element={<Detail data={data}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
