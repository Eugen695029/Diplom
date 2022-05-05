import React from 'react'
import classes from './BaseButton.module.css'
import { useNavigate } from 'react-router-dom';



export default function BaseButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => Click(props.type, props.f, props)} className={classes.myButton} style={{ background: props.color, width: props.w, height: props.h, marginLeft: props.marginLeft }}>
            {props.text}
        </button>
    );

    function Click(type, f, props) {

        //const navigate = useNavigate();
        switch (type) {
            case 'reg':
                f();
                break;
            case 'aut':
                f();
                window.location.reload();
                break;
            case 'conductor':
                navigate(props.goTo);
                break;
            case 'exit':
                f();
                window.location.reload();
                localStorage.clear();
                break;
        }
    }
}