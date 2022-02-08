import React, {useState} from 'react';
import classNames from "classnames";
import classes from "./modalform.module.css";

const ModalForm = ({sendMail, collection, modal}) => {
    const [post, setPost] = useState({title: '', description: ''});

    const addNewLetter = () => {
        const newLetter = {
            _id: Date.now().toString(), ...post, type: 'send', checkbox: false
        }
        collection.insertOne(newLetter);
        setPost({title: '', description: ''});
        sendMail(false);
    }

    return (
        <div className={classes.modalContent}>
            <div className={classes.header}>
                <button onClick={() => modal(false)}>
                    <span className="material-icons">close</span>
                </button>
            </div>
            <input value={post.title} placeholder='Email' className={classNames(classes.input)}
                   onChange={e => setPost({...post, title: e.target.value})} type='text'/>
            <textarea value={post.description} className={classNames(classes.textarea)}
                      onChange={e => setPost({...post, description: e.target.value})} placeholder='Message'/>
            <button onClick={() => addNewLetter()} className={classes.button} disabled={!post.title || !post.description}>
                <span className="material-icons">send</span>Send
            </button>
        </div>
    );
};

export default ModalForm;