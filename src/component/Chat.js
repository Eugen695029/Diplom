import React, { useState, useEffect } from 'react';
import classes from './Chat.module.css'
import ACTIONS from '../socket/actions';
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, username, room, visibility }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit(ACTIONS.SEND_MESSAGE, messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };
    useEffect(() => {
        socket.on(ACTIONS.RECEIVE_MESSAGE, (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    if (visibility == true) {
        return (
            <div className={classes.chat_window}>
                <div className={classes.chat_body}>
                    <ScrollToBottom className={classes.message_container}>
                        {messageList.map((messageContent) => {
                            return (
                                <div className={classes.message} id={username === messageContent.author ? "you" : "other"}>

                                    <div className={classes.message_meta}>
                                        <p id="author">{messageContent.author}</p>
                                        <p className={classes.time} id="time">{messageContent.time}</p>
                                    </div>

                                    <div className={classes.message_content}>
                                        <p>{messageContent.message}</p>
                                    </div>


                                </div>
                            );
                        })}
                    </ScrollToBottom>
                </div>
                <div className={classes.chat_footer}>
                    <input
                        className={classes.myInput}
                        type="text"
                        value={currentMessage}
                        placeholder="Write a message..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
            </div>
        );
    }
}
