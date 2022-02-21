import React, {useEffect, useState} from "react";
import * as Realm from "realm-web";
import Header from "./component/header/Header";
import Application from "./component/application/Application";
import Modal from "./component/modal/Modal";
import Loader from "./component/Loader";
import Detail from "./component/detail/Detail";
import {API_KEY, app, COLLECTION_NAME, DATABASE_NAME, SERVICE_NAME} from "./connect/MongoDB";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./component/sidebar/SideBar";
import './index.css';

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

            await setIsLoader(false);
        }
        login();
    }, []);

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
                               element={<Application valueSearch={valueSearch}
                                                     collection={collection}
                                                     setCount={setCount}
                                                     options={'inbox'}/>}/>
                        <Route path="/send"
                               element={<Application valueSearch={valueSearch} collection={collection}
                                                     options={'send'}/>}/>
                        <Route path="/spam"
                               element={<Application valueSearch={valueSearch} collection={collection}
                                                     options={'spam'}/>}/>
                        <Route path="/trash"
                               element={<Application valueSearch={valueSearch} collection={collection}
                                                     options={'trash'}/>}/>
                        <Route path="/"
                               element={<Application valueSearch={valueSearch} collection={collection}
                                                     setCount={setCount}
                                                     options={'inbox'}/>}/>
                        <Route path="/:id"
                               element={<Detail collection={collection}/>}/>
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
