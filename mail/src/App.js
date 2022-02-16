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

    // const [createInbox, setCreateInbox] = useState(false);

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


    // const create = () => {
    //     const mail = [
    //         {title: 'hello@gmail.com', description: 'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you\'ll get the results immediately. You will feel both challenged and accomplished! You can even download (as PDF) and print the texts and exercises. It\'s enjoyable, fun and free. Good luck!', type: 'inbox', review: false},
    //         {title: 'pommers@hcfmgsrp.com', description: 'Linguapress offers a large collection of graded English texts for use at home or in the classroom, and for the preparation of national or international English qualifications including TOEFL, IELTS, Cambridge First Certificate and Cambridge Advanced.', type: 'inbox', review: false},
    //         {title: 'sagal@aol.com', description: 'Christmas is normally the biggest festival in the English year. Once the festival lasted two days, today it seems to last almost two months. Christmas Day, December 25th, is  the day when most people in Britain sit down to a special meal of roast turkey and Christmas pudding; but Christmas Day is just the high point of the "Christmas period".', type: 'inbox', review: false},
    //         {title: 'loscar@optonline.net', description: 'In the weeks before Christmas, life is very busy. There are parties; there are trips to the cinema or the pantomime; and of course there\'s all the shopping.', type: 'inbox', review: false},
    //         {title: 'maneesh@yahoo.com', description: 'On Christmas day, Britain closes! For most people, Christmas is a time to relax  at last  after many long and busy weeks. The presents have been bought and sent, dozens of cards have been sent and received, the food is waiting to be eaten. For two days at least (if not three or four, depending on the year), the shops will be shut, and the postman will not deliver any letters. For a day or two, even the trains stop running.', type: 'inbox', review: false},
    //         {title: 'osaru@msn.com', description: 'Nowadays, Britain\'s Christmas shopping season lasts almost four months! The first  Christmas catalogues come through letter-boxes at the start of September!', type: 'inbox', review: false},
    //         {title: 'chronos@msn.com', description: 'Lots of busy people like shopping online, because it is easy. All they have to do is choose from the pages of a colourful catalogue, or shop on the Internet. A few days later, goods are delivered to the door..... or at least one hopes they are. Some Internet shops work 24/24 in the weeks before Christmas, to make sure that everyone gets their presents on time..', type: 'inbox', review: false},
    //         {title: 'brbarret@me.com', description: 'Many Christmas catalogues come from charities. Each charity has its own specialities – nature and animals from WWF, the RSPCA and others; "green" products from Greenpeace and Friends of the Earth; and hand-made articles from developing countries from charities like Oxfam and Save the Children. Big charities like these earn a lot of money from their Christmas catalogues.', type: 'inbox', review: false},
    //         {title: 'fairbank@yahoo.com', description: 'In the streets, Christmas arrives at the start of November. Santa Claus and Christmas decorations start appearing in shop windows soon after "Guy Fawkes Night" (5th November). There are no other festivities between Guy Fawkes Night and Christmas', type: 'inbox', review: false},
    //         {title: 'ghost@att.net', description: 'In the streets, vendors sell Father Christmas hats, and reindeer horns! Many shops need extra staff; some shops sell as much in November and December as they do in the other 10 months of the year. Shops stay open later in the evening, and on Sundays too.', type: 'inbox', review: false},
    //         {title: 'stevelim@me.com', description: 'During December, sometimes even earlier, the Christmas lights come on in the streets, and the big shops put on special "Christmas windows", to bring in the shoppers. As Christmas gets closer, the shops become more and more crowded. Nowadays, many shops start their "New Year Sales" before Christmas; some people therefore wait till the last days, in order to pay less for their presents.', type: 'inbox', review: false},
    //         {title: 'jnolan@verizon.net', description: 'When the shops finally close for the holiday, most people are happy that the shopping is over. For a day at least, everything is shut... except pubs and restaurants, which do a lot of business on Christmas day (though not in 2020, on account of Covid 19). In the past, most people used to go to church on Christmas morning; today some people go to church for a special', type: 'inbox', review: false},
    //         {title: 'hoangle@hotmail.com', description: ' In the afternoon, it\'s time for more presents, or to watch a good film, or go our for a walk in the country, or in the park.', type: 'inbox', review: false},
    //         {title: 'rhavyn@icloud.com', description: 'Then, after Christmas, the shopping season starts again, as people spend their Christmas money and look for bargains in the New Year sales.', type: 'inbox', review: false},
    //         {title: 'sekiya@icloud.com', description: 'Most people have a week\'s holiday between Christmas and the New Year. Some, of course, have to keep working; but for most, the last week of the year is a time to relax, enjoy more parties, and do a bit more shopping.', type: 'inbox', review: false},
    //         {title: 'mhoffman@mac.com', description: 'For many people in Britain, the word “scouting” evokes images of boys in short trousers and girls in blue uniforms. Many people imagine that the Scout Association and its female counterpart the Guides Association are old-fashioned organisations from another age - associations for people who are more interested in the past than the future, people who just like camping in the rain and washing in cold water.', type: 'inbox', review: false},
    //         {title: 'gamma@comcast.net', description: 'It’s quite easy to understand why Scouts and Guides have this sort of image. The “Boy Scouts” were founded over 100 years ago by Robert Baden-Powell, a retired English army general; the “Girl Guides” followed three years later. The organisations are  thus very well established!', type: 'inbox', review: false},
    //         {title: 'jmgomez@comcast.net', description: 'Baden-Powell’s original Scouts were organised in an almost military manner. Young people had to learn discipline and learn to do things as a group; they went on camping expeditions in difficult conditions, had to learn to make campfires and, yes, they certainly had to get used to washing in cold water. In those days though, that was not particularly unusual, as many people washed in cold water.', type: 'inbox', review: false},
    //         {title: 'jdhildeb@comcast.net', description: 'While today’s Scouts and Guides still learn how to go camping in the rain and make camp fires, they also take part in a wide variety of exciting adventure activities, including kayaking and horse riding, mountain-biking, rock-climbing, pot-holing and a lot more. ', type: 'inbox', review: false},
    //         {title: 'bmidd@me.com', description: 'Many Scout and Guide troops also take part in international aid programmes such as Book Aid, collecting useful books that can be sent to poor schools in developing countries. Others have their own special aid projects, for which they raise money in many different ways.', type: 'inbox', review: false},
    //         {title: 'tromey@verizon.net', description: 'At times, some people have said that the Guides and the Scouts should join together - that in today’s world there should no longer be two organisations, one for boys and the other for girls. In 1999, when the Guide Association organised the third World Guide Camp in England - for over 3000 participants - journalists often asked Guides whether they would not have preferred to be on a camp with boys too. To the surprise of many reporters, the answers were always “No”; for most of the Guides interviewed, Guide Camp, without boys, was a welcome change from co-educational classes at school.', type: 'inbox', review: false}
    //     ]
    //
    //     collection.insertMany(mail);
    //     setUpdate(!update);
    // }

    if (loader) {
        return <Loader/>
    } else {

        return (
            <div>
                {/*<button type='button' onClick={create}>*/}
                {/*    Add in the DB*/}
                {/*</button>*/}
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
