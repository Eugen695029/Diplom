import React, { Component } from 'react';
import classes from './ServiceCard.module.css';
import { useNavigate } from 'react-router-dom';

function ServiceCard (props){
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate(props.goTo)} className={classes.mainContainer}>
            <div className={classes.container1}>
                <div className={classes.title}>
                    <h1>{props.title}</h1>
                </div>
                <div className={classes.text}>
                    <p>{props.text}</p>
                </div>
            </div>

            <div className={classes.container2}>
                <img src={props.img} />
            </div>
        </div>
    );
}

export default ServiceCard;
