import classes from './NavBar.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './navBarComponent/UserProfile.js';
import Registration from './navBarComponent/Registration.js';
import Authorization from './navBarComponent/Authorization.js';
import BaseButton from '../button/BaseButton';
import axios from 'axios';

function NavBar(props) {

    const [navBar, setNavBar] = useState(true); //Состояние навигационной понели
  
    const viewNavBar = () => { //Изменение стостояния навигационной панели на противоположное 
      setNavBar(!navBar);
    };
  
    const [reg, setReg] = useState(false); //Состояние понелий регистрации
  
    const regActive = () => { //Изменение стостояния понелий регистрации
      setReg(!reg);
    };

    const [user, setUser] = useState(false); //Состояние понелий регистрации

    const userActive = () => { //Изменение стостояния понелий регистрации
        setUser(!user);        
    };

    if(navBar==false){ //Статус видимости навигационной панели
        if(localStorage.token){ //Проверка вошёл пользователь или нет
            return(
                <UserProfile state={() => viewNavBar()} regSet={() => regActive()} userSet={() => userActive()}/>
            );
        }
        else{

            if(reg==false){ //Статус формы регистрации false
                return(
                    <Authorization state={() => viewNavBar()} regSet={() => regActive()} userSet={() => userActive()}/>
                );
            }
            else{
                return(
                    <Registration state={() => viewNavBar()} regSet={() => regActive()}/>
                );
            }
        }
    }
    else{
        return (
            <div className={classes.mainContainer}>
                <button className={classes.menuButton} onClick={() =>  viewNavBar()}>=</button>
            </div>
        );
    }

}


export default NavBar;
