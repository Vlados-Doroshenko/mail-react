import React from 'react';
import classes from './header.module.css';
import 'material-icons';


const Header = ({valueSearch, setValueSearch, update, setUpdate}) => {

    return (
        <header>
            <nav className={classes.header}>
                <a href='./' className={classes.brand}>
                    <span className="material-icons">mail</span>
                    Mail
                </a>
                <div className={classes.search__wrapper}>
                    <input className={classes.search} type="search" placeholder="Search here!" value={valueSearch} onChange={e => setValueSearch(e.target.value)}/>
                    <button className={classes.search__btn} type="submit" name="submit" disabled={!valueSearch} onClick={() => setUpdate(!update)}>
                        <span className="material-icons">search</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;