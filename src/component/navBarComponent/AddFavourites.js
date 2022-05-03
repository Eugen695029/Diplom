import React from 'react';
import classes from '../NavBar.module.css';
import BaseButton from '../../button/BaseButton';

function AddFavourites(props) {
    return (
        <div className={classes.settingContainer}>
            <h1>Избранное</h1>
            <div className={classes.inputContainer}>
                <div className={classes.item2}>
                    <div className={classes.textContainer}>
                        <p>ФИО: </p>
                    </div>
                    <div className={classes.textContainer}>
                        
                    </div>
                </div>
                <div className={classes.item2}>
                    <div className={classes.textContainer}>
                        <p>Телефон: </p>
                    </div>
                    <div className={classes.textContainer}>
                        
                    </div>
                </div>
            </div>
            <div className={classes.settingButtonContainer}>
                <BaseButton  goTo='#' type='reg' f={() => props.addUser()} text="Закрыть"/>
            </div>
        </div>
    );
}

export default AddFavourites;
