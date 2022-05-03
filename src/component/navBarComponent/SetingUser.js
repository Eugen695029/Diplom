import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../button/BaseButton';
import classes from '../NavBar.module.css';


function SetingUser(props) {
    const [update, setUpdate] = useState(() => {
        return {
            firstName: "",
            name:"",
            midleName:"",
            phone:"",
            date:"",
        }
    });

    const changeInputRegister = event => {
        event.persist()
        setUpdate(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    };

    function submitChackin() {
        axios.post(`http://localhost:3001/update?login=${localStorage.login}&firstName=${update.firstName}&name=${update.name}&midleName=${update.midleName}&phone=${update.phone}&date=${update.date}`).then().catch((e) => {
            alert(e.message)
        })
    };
    return (
           <div className={classes.settingContainer}>
               <h1>Настройки</h1>
               <div className={classes.inputContainer}>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Login: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <p>{localStorage.login}</p>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Password: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <p>{localStorage.password}</p>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Company: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <p>{localStorage.company}</p>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Фамилия: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <input placeholder={localStorage.firstName} className={classes.myInput2} onChange={changeInputRegister} type="name" id="firstName" name="firstName"/>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Имя: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <input placeholder={localStorage.name} className={classes.myInput2} onChange={changeInputRegister} type="name" id="name" name="name"/>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Отчество: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <input placeholder={localStorage.midleName} className={classes.myInput2} onChange={changeInputRegister} type="name" id="midleName" name="midleName"/>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>Телефон: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <input placeholder={localStorage.phone} className={classes.myInput2} onChange={changeInputRegister} type="name" id="phone" name="phone"/>
                       </div>
                   </div>
                   <div className={classes.item2}>
                       <div className={classes.textContainer}>
                           <p>ДР: </p>
                       </div>
                       <div className={classes.textContainer}>
                           <input value={localStorage.date} className={classes.myInput3} onChange={changeInputRegister} type="date" id="date" name="date"/>
                       </div>
                   </div>
               </div>
               <div className={classes.settingButtonContainer}>
                   <BaseButton f={() => submitChackin()} goTo='#' type='reg' text="Сохранить"/>
                   <BaseButton  goTo='#' type='reg' f={() => props.settingAdd()} text="Закрыть"/>
               </div>
           </div>
    );
}

export default SetingUser;
