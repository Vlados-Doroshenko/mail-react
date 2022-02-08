import React from 'react';
import classes from './loader.module.css';

const Loader = () => {
    return (
        <section className={classes.preloader}>
            <div className={classes.loader}>
                <div className={classes.text}>
                    <h6>Please wait...</h6>
                </div>
                <span></span>
                <span></span>
            </div>
        </section>
    );
};

export default Loader;