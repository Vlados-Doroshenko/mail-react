import React, {useState} from 'react';
import classNames from "classnames";
import classes from "./modalform.module.css";

const ModalForm = ({collection, setActive, setUpdate, update}) => {
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
        setUpdate(!update);
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
            {!form.description ? '' :
                <button onClick={() => addNewLetter()} className={classes.button}>
                    <span className="material-icons">send</span>Send
                </button>
            }
        </div>
    );
};

export default ModalForm;