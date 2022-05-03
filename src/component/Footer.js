import React, { Component } from 'react'
import classes from './Footer.module.css'
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <div className={classes.container}>
            <NavLink to="/">
                Droom 2022
            </NavLink>
        </div>
    );
}

