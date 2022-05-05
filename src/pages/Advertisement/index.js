import React, {useState} from 'react';
import classes from './Advertisement.module.css';
import BaseButton from '../../button/BaseButton.jsx';
import axios from 'axios';
function Advertisement() {

    const [advertisement, setAdvertisement] = useState(() => {
        return {
            title: "",
            text: "",
            
        }
    });
    const changeInputRegister = event => {
        event.persist()
        setAdvertisement(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    };

    function submitChackin() {
        axios.post(`http://localhost:3001/advertisementAdd?title=${advertisement.title}&text=${advertisement.text}&companyName=${localStorage.company}`).catch((e) => {
            alert(e.message)
        })
    };


    if(localStorage.token){
    return (
        <div className={classes.mainContainer}>
            <div className={classes.textContainer}>
                <div className={classes.item}>
                    <p>Title:</p>
                    <input className={classes.myInput} style={{width: '100px'}} type="text" id="title" name="title" value={advertisement.title} onChange={changeInputRegister} />
                </div>

                <div className={classes.item}>
                    <p>Text:</p>
                    <input className={classes.myInput} style={{width: '400px'}} type="text" id="text" name="text" value={advertisement.text} onChange={changeInputRegister} />
                </div>

                <div className={classes.item}>
                    <BaseButton type={'reg'} f={() => submitChackin()} text={"Опубликовать"}/>
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

export default Advertisement;
