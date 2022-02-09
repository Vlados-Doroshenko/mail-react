import React from 'react';
import Content from "../content/Content";
import classes from './aplication.module.css'

const Aplication = ({data, remove, checkbox, spam, inbox, options, trash}) => {

    return (
        <div className={classes.aplication}>
            {!data.length ?
            <h1 className={classes.aplication__content}>
                {options === 'inbox' ? 'The inbox is empty' : ''}
                {options === 'trash' ? 'The trash is empty' : ''}
                {options === 'send' ? 'You haven\'t sent any messages yet' : ''}
                {options === 'spam' ? 'The spam is empty' : ''}
            </h1>
                :
            <table cellspacing="0">
                <thead>
                <tr>
                    <th>
                        <input type='checkbox'/>
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
            }
        </div>
)
    ;
};

export default Aplication;