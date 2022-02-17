import React, {useEffect, useState} from "react";
import * as Realm from "realm-web";
import Header from "./component/header/Header";
import Aplication from "./component/aplication/Aplication";
import Modal from "./component/modal/Modal";
import Loader from "./component/Loader";
import Detail from "./component/detail/Detail";
import {API_KEY, app, COLLECTION_NAME, DATABASE_NAME, SERVICE_NAME} from "./connect/MongoDB";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./component/sidebar/SideBar";
import './index.css';

const App = () => {

    const [collection, setCollection] = useState(null);

    const [update, setUpdate] = useState(true);

    const [loader, setLoader] = useState(false);

    const [activeModal, setActiveModal] = useState(false);

    const [valueSearch, setValueSearch] = useState('');

    const [count, setCount] = useState(0);

    useEffect(() => {
        const login = async () => {
            setLoader(true);

            await app.logIn(Realm.Credentials.apiKey(API_KEY));
            const client = app.currentUser.mongoClient(SERVICE_NAME);
            const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
            setCollection(collection);

            await setLoader(false);
        }
        login();
    }, [update]);

    if (loader) {
        return <Loader/>
    } else {

        return (
            <div>
                <BrowserRouter>
                    <Header update={update} setUpdate={setUpdate} setValueSearch={setValueSearch}
                            valueSearch={valueSearch} count={count}/>
                    <SideBar setModal={setActiveModal} update={update} setUpdate={setUpdate} collection={collection}
                             count={count} setCount={setCount}/>
                    <Routes>
                        <Route path="/inbox"
                               element={<Aplication valueSearch={valueSearch} update={update} setUpdate={setUpdate}
                                                    collection={collection}
                                                    options={'inbox'}/>}/>
                        <Route path="/send"
                               element={<Aplication valueSearch={valueSearch} collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'send'}/>}/>
                        <Route path="/spam"
                               element={<Aplication valueSearch={valueSearch} collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'spam'}/>}/>
                        <Route path="/trash"
                               element={<Aplication valueSearch={valueSearch} collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'trash'}/>}/>
                        <Route path="/"
                               element={<Aplication valueSearch={valueSearch} collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'inbox'}/>}/>
                        <Route path="/:id"
                               element={<Detail collection={collection} update={update} setUpdate={setUpdate}/>}/>
                    </Routes>
                </BrowserRouter>
                <Modal update={update} setUpdate={setUpdate} activeModal={activeModal} setActive={setActiveModal}
                       collection={collection}/>
            </div>
        );
    }
}

export default App;
