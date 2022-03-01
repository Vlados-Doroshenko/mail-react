import React, {useState} from 'react';
import classNames from "classnames";
import classes from "./modalform.module.css";

const ModalForm = ({collection, setActive, isReload, setIsReload}) => {
    const [form, setForm] = useState({
        title: "", description: ""
    });

    const addNewLetter = () => {
        const newLetter = {
            ...form, type: 'send'
        }
        collection.insertOne(newLetter);
        setForm({title: '', description: ''});
        setActive(false);
        setIsReload(!isReload);
    }

    return (
        <div className={classes.modal__form}>
            <div>
                <input value={form.title} placeholder='Email' className={classNames(classes.input)}
                       onChange={e => setForm({...form, title: e.target.value})} type='text'/>
            </div>
            <div>
            <textarea value={form.description} className={classNames(classes.textarea)}
                      onChange={e => setForm({...form, description: e.target.value})} placeholder='Message'/>
            </div>
            <button onClick={() => addNewLetter()} disabled={form.description.length < 3 || form.title.length < 3}
                    className={classes.button}>
                <span className="material-icons">send</span>Send
            </button>
        </div>
    );
};

export default ModalForm;