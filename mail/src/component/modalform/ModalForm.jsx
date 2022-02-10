import React, {useState} from 'react';
import classNames from "classnames";
import classes from "./modalform.module.css";

const ModalForm = ({collection, setActive, setUpdate, update}) => {
    const [post, setPost] = useState({title: '', description: ''});

    const addNewLetter = () => {
        const newLetter = {
            ...post, type: 'send'
        }
        collection.insertOne(newLetter);
        setPost({title: '', description: ''});
        setActive(false);
        setUpdate(!update);
    }

    return (
        <div className={classes.modal__form}>
            <div>
            <input value={post.title} placeholder='Email' className={classNames(classes.input)}
                   onChange={e => setPost({...post, title: e.target.value})} type='text'/>
            </div>
            <div>
            <textarea value={post.description} className={classNames(classes.textarea)}
                      onChange={e => setPost({...post, description: e.target.value})} placeholder='Message'/>
            </div>
            <button onClick={() => addNewLetter()} className={classes.button}
                    disabled={!post.title || !post.description}>
                <span className="material-icons">send</span>Send
            </button>
        </div>
    );
};

export default ModalForm;