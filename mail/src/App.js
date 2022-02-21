import React, {useEffect, useState} from "react";
import * as Realm from "realm-web";
import Header from "./component/header/Header";
import Modal from "./component/modal/Modal";
import Loader from "./component/Loader";
import DetailLetter from "./component/detailletter/DetailLetter";
import {API_KEY, app, COLLECTION_NAME, DATABASE_NAME, SERVICE_NAME} from "./connect/MongoDB";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./component/sidebar/SideBar";
import './index.css';
import LetterList from "./component/letterlist/LetterList";

const App = () => {

    const [collection, setCollection] = useState(null);

    const [isLoader, setIsLoader] = useState(false);

    const [activeModal, setActiveModal] = useState(false);

    const [valueSearch, setValueSearch] = useState('');

    const [count, setCount] = useState(0);

    useEffect(() => {
        const login = async () => {
            setIsLoader(true);

            await app.logIn(Realm.Credentials.apiKey(API_KEY));
            const client = app.currentUser.mongoClient(SERVICE_NAME);
            const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
            setCollection(collection);

            const items = await collection.find({review: false});
            await setCount(items.length);

            await setIsLoader(false);
        }
        login();
    }, []);

    const findCountUnread = () => {
        const countUnread = async () => {
            const items = await collection.find({review: false});
            await setCount(items.length);
        }
        countUnread();
    }

    useEffect(() => {
        findCountUnread();
    }, [count]);

    if (isLoader) {
        return <Loader/>
    } else {

        return (
            <div>
                <BrowserRouter>
                    <Header setValueSearch={setValueSearch}
                            valueSearch={valueSearch} count={count}/>
                    <SideBar setModal={setActiveModal} collection={collection}
                             count={count} setCount={setCount}/>
                    <Routes>
                        <Route path="/inbox"
                               element={<LetterList valueSearch={valueSearch}
                                                    collection={collection}
                                                    setCount={setCount} count={count}
                                                    options={'inbox'}/>}/>
                        <Route path="/send"
                               element={<LetterList valueSearch={valueSearch} collection={collection}
                                                    options={'send'}/>}/>
                        <Route path="/spam"
                               element={<LetterList valueSearch={valueSearch} collection={collection}
                                                    setCount={setCount} count={count}
                                                    options={'spam'}/>}/>
                        <Route path="/trash"
                               element={<LetterList valueSearch={valueSearch} collection={collection}
                                                    options={'trash'}/>}/>
                        <Route path="/"
                               element={<LetterList valueSearch={valueSearch} collection={collection}
                                                    setCount={setCount}
                                                    options={'inbox'}/>}/>
                        <Route path="/:id"
                               element={<DetailLetter collection={collection} setCount={setCount} count={count}/>}/>
                    </Routes>
                </BrowserRouter>
                {activeModal &&
                    <Modal activeModal={activeModal} setActive={setActiveModal}
                           collection={collection}/>}
            </div>
        );

    }
}

export default App;
