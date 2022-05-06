import classes from '../NavBar.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../button/BaseButton';
import axios from 'axios';
import { v4 } from 'uuid';
function Authorization(props) {
    const [register, setRegister] = useState(() => {
        return {
            login: "",
            password: "",
        }
    });

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    };


    function submitChackin() {
            axios.post(`http://localhost:3001/login?login=${register.login}&password=${register.password}`)
            .then((resp) => {
                //console.log("getted",resp.data.message, resp.status, register.login) 
                if (resp.status == 200) {
                    localStorage.setItem('token', resp.data.token);
                    localStorage.setItem('login', register.login);
                    localStorage.setItem('password', register.password);
                    localStorage.setItem('firstName', resp.data.userInfo.firstName);
                    localStorage.setItem('name', resp.data.userInfo.name);
                    localStorage.setItem('midleName', resp.data.userInfo.midleName);
                    localStorage.setItem('phone', resp.data.userInfo.phone);
                    localStorage.setItem('date', resp.data.userInfo.date);
                    localStorage.setItem('company', resp.data.userInfo.company);
                    localStorage.setItem('role', resp.data.userInfo.role);
                    props.userSet();
                    window.location.reload();
                }
            }).catch((e) => {
                alert(e.message)
            });
        
    };

    return(
        <div className={classes.mainContainer}>
            <button className={classes.menuButton} onClick={() =>  props.state()}>=</button>
            <div className={classes.logInContainer}>
                <h1>Войти</h1>
                <div className={classes.inputContainer}>
                <input placeholder='Login' className={classes.myInput} type="name" id="login" name="login" value={register.login} onChange={changeInputRegister} />
                <input placeholder='Password' className={classes.myInput} type="password" id="password" name="password" value={register.password} onChange={changeInputRegister} />
                </div>
                <div className={classes.buttonContainer}>
                    <BaseButton f={() => submitChackin()} goTo='#' type='reg' text="Войти" />
                    <BaseButton  goTo='#' type='reg' f={() => props.regSet()} text="Регистрация" />
                </div>
            </div>
        </div>
    );
    
}

export default Authorization;
