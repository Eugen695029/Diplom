import React, { useState } from 'react';
import classes from './SettingsWorkSpace.module.css';
import axios from 'axios';

function Index(props) {
    function submitChackin(idBg) {
        axios.post(`http://localhost:3001/idBg?idBg=${idBg}&login=${localStorage.login}`)
        .catch((e) => {
            alert(e.message)
        });
        window.location.reload();
    };

    if(localStorage.token){
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
    else{
        return (
            <div className={classes.container}>
                  <div className={classes.box}>
                      <h1>
                        Пожалуйста авторизуйтесь
                      </h1>
                  </div>
            </div>
          );
    }
}

export default Index;
