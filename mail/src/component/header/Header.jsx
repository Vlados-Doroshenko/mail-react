import React from 'react';
import classes from './header.module.css';
import {NavLink} from "react-router-dom";
import 'material-icons';


const Header = () => {

    return (
        <header>
            <nav className={classes.header}>
                <a href='./' className={classes.brand}>
                    <span className="material-icons">mail</span>
                    Mail
                </a>
            </nav>
        </header>
    );
};

export default Header;