import React, { useState, useEffect, useRef } from 'react'
import classes from './Conference.module.css'
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import BaseButton from '../../button/BaseButton';

export default function Conference() {

    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, []);

    return (
        <div className={classes.container}>

            <div ref={rootNode} className={classes.box}>
                <h1>Публичные комнаты</h1>

                <ul>
                    {rooms.map(roomID => (
                        <li key={roomID} style={{ color: "#fff", margin: "5%" }}>
                            {roomID}
                            <BaseButton goTo={`/room/${roomID}`} marginLeft="5%" color="#06b06d" text="ВОЙТИ" type="conductor"/>
                        </li>
                    ))}
                </ul>

            </div>
        </div>

    );

}
