import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../button/BaseButton';
import classes from '../NavBar.module.css';
import SetingUser from '../navBarComponent/SetingUser.js';
import AddUser from './AddUser.js';
import AddFavourites from '../navBarComponent/AddFavourites.js';


function UserProfile(props) {

    const [setting, setSetting] = useState(false);
    const settingAdd = () => { //Изменение стостояния понели настройки
        setSetting(!setting);
    };

    const [addUser, setAddUser] = useState(false);
    const addUserKey = () => { //Изменение стостояния понели настройки
        setAddUser(!addUser);
    };

    const [favourites, setFavourites] = useState(false);
    const addFavourites = () => { //Изменение стостояния понели настройки
        setFavourites(!favourites);
    };
    return(
        <div className={classes.mainContainer}>
            <button className={classes.menuButton} onClick={() =>  props.state()}>=</button>
            <div className={classes.logInContainer}>
                <h1>{localStorage.login}</h1>
                <div className={classes.inputContainer}>
                    {
                        localStorage.role == 2 ? 
                        
                        <div></div>
                        :
                        <div  onClick={() => addUserKey()} className={classes.item}>
                            <div className={classes.imgContainer}>
                              <p>+</p>
                            </div>
                            <div className={classes.textContainer}>
                                <p>Добавить сотрудника</p>
                            </div>
                        </div>
                    }
                    <div onClick={() => settingAdd()} className={classes.item}>
                        <div className={classes.imgContainer2}></div>
                        <div className={classes.textContainer}>
                            <p>Настройки профиля</p>
                        </div>
                    </div>

                </div>
                <div className={classes.buttonContainer}>
                    <BaseButton  goTo='#' type='exit' f={() => props.userSet()} text="Выйти"/>
                </div>
            </div>

            {
                setting ? <SetingUser settingAdd={() => settingAdd()}/> : <div></div>
            }

            {
                addUser ? <AddUser addUser={() => addUserKey()}/> : <div></div>
            }

            {
                favourites ? <AddFavourites favourites={() => addFavourites()}/> : <div></div>
            }

        </div>
    );
}

export default UserProfile;