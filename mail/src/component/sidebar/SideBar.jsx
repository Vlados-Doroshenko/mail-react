import React, {useState} from 'react';
import classes from './sidebar.module.css';
import {NavLink} from "react-router-dom";

const SideBar = ({ visible }) => {
    const [active, setActive] = useState(false);

    return (
        <div className={classes.sidebar__wrappper}>
            <ul className={classes.sidebar__list}>
                <li className={classes.sidebar__item}>
                    <button className={classes.sidebar__btn_modal} onClick={visible}>
                        <span className="material-icons">add</span>
                        Create
                    </button>
                </li>
                <li className={classes.sidebar__item}>
                    <NavLink to='/inbox' className={active ? 'active' : ''} onClick={() => setActive(false)}>
                        <span className="material-icons">inbox</span>
                        Inbox
                    </NavLink>
                </li>
                <li className={classes.sidebar__item}>
                    <NavLink to='send' className={active ? 'active' : ''} onClick={() => setActive(false)}>
                        <span className="material-icons">send</span>
                        Send
                    </NavLink>
                </li>
                <li className={classes.sidebar__item}>
                    <NavLink to='spam' className={active ? 'active' : ''} onClick={() => setActive(false)}>
                        <span className="material-icons">report</span>
                        Spam
                    </NavLink>
                </li>
                <li className={classes.sidebar__item}>
                    <NavLink to='trash' className={active ? 'active' : ''} onClick={() => setActive(false)}>
                        <span className="material-icons">delete</span>
                        Trash
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;