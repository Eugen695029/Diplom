import { useParams } from 'react-router-dom';
import useWebRTC, { LOCAL_VIDEO } from '../../hooks/useWebRTC';

import React, { useState } from 'react';
import classes from './ConferenceRoom.module.css'
import SpecialButton from '../../button/SpecialButton.jsx'
import Chat from '../../component/Chat.js'

import phonePNG from '../../img/phone.png'
import messengerPNG from '../../img/messenger.png'
import socket from '../../socket';

function layout(clientsNumber = 1) {
  const pairs = Array.from({ length: clientsNumber })
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        pointerEvents: 'none',
        width: '50%',
        height: '50%',
      }];
    }

    return row.map(() => ({
      width: '50%',
      height,
    }));
  }).flat();
}

export default function Room() {
    const { id: roomID } = useParams();
    const { clients, provideMediaRef, stopWebCam } = useWebRTC(roomID);
    const videoLayout = layout(clients.length);
    const [visibility, v] = useState(false);


    const viewChat = (value) => {
      if (visibility == false) {
        v(value);
      }
      else {
        v(!value);
      }
    }

    if(localStorage.token){
      return (
        <div className={classes.containerMain}>
          <div className={classes.videContainer}>
            <div className={classes.containerItem1}>
              {clients.map((clientID, index) => {
                return (
                  <div key={clientID} style={videoLayout[index]} id={clientID}>
                    <video
                      width='100%'
                      height='100%'
                      ref={instance => {
                        provideMediaRef(clientID, instance);
                      }}
                      autoPlay
                      playsInline
                      muted={clientID === LOCAL_VIDEO}
                    />
                  </div>
                );
              })}
            </div>
            <div className={classes.containerItem2}>
              <div>
                <SpecialButton img={phonePNG} w="42px" h="42px" type="leave" />
              </div>
              <div>
                <SpecialButton viewChat={viewChat} img={messengerPNG} w="42px" h="42px" type="chat" />
              </div>
            </div>
          </div>
          <Chat visibility={visibility} socket={socket} username={localStorage.login} room={roomID} />
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