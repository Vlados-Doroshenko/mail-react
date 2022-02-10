import React, {useEffect, useState} from "react";
import * as Realm from "realm-web";
import Header from "./component/header/Header";
import Aplication from "./component/aplication/Aplication";
import Modal from "./component/modal/Modal";
import Loader from "./component/Loader";
import Detail from "./component/detail/Detail";
import {API_KEY, SERVICE_NAME, DATABASE_NAME, COLLECTION_NAME, app} from "./connect/MongoDB";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SettingMenu from "./component/settingMenu/SettingMenu";
import SideBar from "./component/sidebar/SideBar";
import './index.css';

const App = () => {

    const [collection, setCollection] = useState(null);

    const [update, setUpdate] = useState(true);

    const [loader, setLoader] = useState(false);

    const [activeModal, setActiveModal] = useState(false);

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

    // const [setting, setSetting] = useState(true);

    if (loader) {
        return <Loader/>
    } else {

        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <SideBar setModal={setActiveModal} update={update} setUpdate={setUpdate}/>
                    {/*{setting ? '' :*/}
                    {/*    <SettingMenu collection={collection}/>}*/}
                    <Routes>
                        <Route path="/inbox"
                               element={<Aplication update={update} setUpdate={setUpdate}
                                                    collection={collection}
                                                    options={'inbox'}/>}/>
                        <Route path="/send"
                               element={<Aplication collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'send'}/>}/>
                        <Route path="/spam"
                               element={<Aplication collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'spam'}/>}/>
                        <Route path="/trash"
                               element={<Aplication collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'trash'}/>}/>
                        <Route path="/"
                               element={<Aplication collection={collection}
                                                    update={update} setUpdate={setUpdate}
                                                    options={'inbox'}/>}/>
                        <Route path="/:id" element={<Detail/>}/>
                    </Routes>
                </BrowserRouter>
                <Modal update={update} setUpdate={setUpdate} activeModal={activeModal} setActive={setActiveModal} collection={collection}/>
            </div>
        );
    }
}

export default App;
