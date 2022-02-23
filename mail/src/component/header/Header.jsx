import React from 'react';
import classes from './header.module.css';
import 'material-icons';

const Header = ({valueSearch, setValueSearch, count}) => {

    return (
        <header>
            <nav className={classes.header}>
                <a href='./' className={classes.brand}>
                    <span className="material-icons">mail</span>
                    Mail
                </a>
                <div className={classes.search__wrapper}>
                    <input className={classes.search} type="search" placeholder="Search here!" value={valueSearch}
                           onChange={e => setValueSearch(e.target.value)}/>
                </div>
                <div className={count === 0 ? classes.notification : classes.notification__active}>
                    <span className="material-icons">notifications</span>{count === 0 ? "" :
                    <div className={classes.notification__count}>{count}</div>}
                </div>
            </nav>
        </header>
    );
};

export default Header;