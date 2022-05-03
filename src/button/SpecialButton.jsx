import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SpecialButton.module.css';




function Click(type,viewChat,visibility){
    //const navigate = useNavigate();
    switch(type){
        case 'chat':
            viewChat(visibility);
        break;
        case 'leave':
            //navigate('/conference');
        break;
    }
}

class SpecialButton extends Component {
    state = {
        visibility: true
    };

    render() {
        return (
            <button onClick={() => Click(this.props.type,this.props.viewChat,this.state.visibility)} className={classes.myButton} style={{background: this.props.color, backgroundImage: `url(${this.props.img})`, width: this.props.w, height: this.props.h}}>
                {this.props.text}
            </button>
        );
    }
}

export default SpecialButton;
