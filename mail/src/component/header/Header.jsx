import React from 'react';
import classes from './header.module.css';
import {NavLink} from "react-router-dom";
import 'material-icons';
import '@mui/material';


const Header = ({visible}) => {

    return (
        <header>
            <nav className={classes.header}>
                <a href='./' className={classes.brand}>
                    <span className="material-icons">mail</span>
                    Mail
                </a>
                <ul>
                    <li>
                        <button onClick={visible}>
                            <span className="material-icons">add</span>
                            Create
                        </button>
                    </li>
                    <li>
                        <NavLink to='/inbox'>
                            <button>
                                <span className="material-icons">inbox</span>
                                Inbox
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='send'>
                            <button>
                                <span className="material-icons">send</span>
                                Send
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='spam'>
                            <button>
                                <span className="material-icons">report</span>
                                Spam
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='trash'>
                            <button>
                                <span className="material-icons">delete</span>
                                Trash
                            </button>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;