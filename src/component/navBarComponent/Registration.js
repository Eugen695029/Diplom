import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../button/BaseButton';
import classes from '../NavBar.module.css';


function Registration(props) {

    const [register, setRegister] = useState(() => {
        return {
            login: "",
            password: "",
            company: "",
        }
    });
    const navigate = useNavigate();
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
        axios.post(`http://localhost:3001/registration/manager?login=${register.login}&password=${register.password}&companyName=${register.company}`).then(() => {props.regSet()}).catch((e) => {
            alert(e.message)
        })
    };

    return (
        <div className={classes.mainContainer}>
            <button className={classes.menuButton} onClick={() =>  props.state()}>=</button>
            <div className={classes.logInContainer}>
                <h1>Регистрация</h1>
                <div className={classes.inputContainer}>
                <input placeholder='Login' className={classes.myInput} type="login" id="login" name="login" value={register.login} onChange={changeInputRegister} />
                <input placeholder='Password' className={classes.myInput} type="password" id="password" name="password" value={register.password} onChange={changeInputRegister} />
                <input placeholder='Компания' className={classes.myInput} type="text" id="company" name="company" value={register.company} onChange={changeInputRegister} />
                </div>
                <div className={classes.buttonContainer}>
                    <BaseButton f={submitChackin} goTo='#' type='reg' text="Зарегистрироваться" />
                    <BaseButton goTo='#' type='reg' f={props.regSet} text="Войти" />
                </div>
            </div>
        </div>
    );
}

export default Registration;
