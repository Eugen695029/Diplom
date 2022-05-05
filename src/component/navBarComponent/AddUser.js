import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../button/BaseButton';
import classes from '../NavBar.module.css';

function AddUser(props) {

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
        axios.post(`http://localhost:3001/registration/employee?login=${register.login}&password=${register.password}&companyName=${localStorage.company}`).then(() => {}).catch((e) => {
            alert(e.message)
        })
        alert("Пользователь создан");
    };

    return (
        <div className={classes.settingContainer}>
            <h1>Добавить сотрудника</h1>
            <div className={classes.inputContainer}>
                <div className={classes.item2}>
                    <div className={classes.textContainer}>
                        <p>Login: </p>
                    </div>
                    <div className={classes.textContainer}>
                        <input className={classes.myInput2} onChange={changeInputRegister} type="text" id="login" name="login"/>
                    </div>
                </div>
                <div className={classes.item2}>
                    <div className={classes.textContainer}>
                        <p>Password: </p>
                    </div>
                    <div className={classes.textContainer}>
                        <input className={classes.myInput2} onChange={changeInputRegister} type="password" id="password" name="password"/>
                    </div>
                </div>
                <div className={classes.item2}>
                    <div className={classes.textContainer}>
                        <p>Компания: </p>
                    </div>
                    <div className={classes.textContainer}>
                        <p>{localStorage.company}</p>
                    </div>
                </div>
            </div>
            <div className={classes.settingButtonContainer}>
                <BaseButton f={() => submitChackin()} goTo='#' type='reg' text="Создать"/>
                <BaseButton  goTo='#' type='reg' f={() => props.addUser()} text="Закрыть"/>
            </div>
        </div>
 );
}

export default AddUser;
