import React, { useState } from 'react';
import classes from './SettingsWorkSpace.module.css';
import axios from 'axios';

function Index(props) {
    function submitChackin(idBg) {
        axios.post(`http://localhost:3001/idBg?idBg=${idBg}&login=${localStorage.login}`)
        .catch((e) => {
            alert(e.message)
        });
        alert('Фон рабочего стола был изменён, обновите страницу для его отображения');
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.settingContainer}>
                <div className={classes.bgContainer}>
                    <div onClick={() => submitChackin(1)} className={classes.item1}/>
                    <div onClick={() => submitChackin(2)} className={classes.item2}/>
                    <div onClick={() => submitChackin(3)} className={classes.item3}/>
                    <div onClick={() => submitChackin(4)} className={classes.item4}/>
                </div>
            </div>
        </div>
    );
}

export default Index;
