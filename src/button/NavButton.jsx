import React from 'react';
import classes from './NavButton.module.css'
import { useNavigate } from 'react-router-dom';

export default function NavButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => { navigate(props.goTo) }} className={classes.navBt} style={{ background:props.color }}>
            {props.text}
        </button>
    );
}
