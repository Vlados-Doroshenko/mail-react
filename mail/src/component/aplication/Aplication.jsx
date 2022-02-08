import React from 'react';
import Content from "../content/Content";
import classes from './aplication.module.css'

const Aplication = ({data, remove, checkbox, spam, inbox, options, trash}) => {

    if (!data.length) {
        if (options === 'inbox') {
            return (
                <h1 style={{textAlign: 'center', marginTop: '150px'}}>The inbox is empty</h1>
            )
        } else if (options === 'trash') {
            return (
                <h1 style={{textAlign: 'center', marginTop: '150px'}}>The trash is empty</h1>
            )
        } else if (options === 'send') {
            return (
                <h1 style={{textAlign: 'center', marginTop: '150px'}}>You haven't sent any messages yet</h1>
            )
        } else {
            return (
                <h1 style={{textAlign: 'center', marginTop: '150px'}}>The spam is empty</h1>
            )
        }
    }

    return (
        <div className={classes.aplication}>
            <table cellspacing="0">
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Title</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((post, id) =>
                        <Content key={id} post={post} remove={remove} checkbox={checkbox} spam={spam} trash={trash}
                                 inbox={inbox}
                                 options={options}/>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default Aplication;