import { useEffect, useMemo } from "react";
import { Widget } from "./Widget";
import { nanoid } from "nanoid";
import {useChat} from "./ChatProvider";

export const WidgetContainer = ({license = "", greeting = "hello there!"}) => {

    const {messages, sendMessage, typingMessage } = useChat();

    useEffect( () => {
        if ( greeting && messages.length === 0 ) {
            sendMessage({
                _id: nanoid(),
                message: greeting,
                sender: "remote",
                direction: "incoming",
            });
        }
    },[greeting, messages, sendMessage]);

    const remoteName = useMemo( () => {
        if ( license === "123" ) {
            return "Chatscope";
        } else if (license === "456" ) {
            return "ChatKitty";
        } else if (license === "789" ) {
            return "EvilNull";
        }
    },[license]);

    const handleSend = async (message) => {
        let newMessage = 
            {
                _id: nanoid(),
                message: message,
                sender: "me",
                direction: "outgoing",
            }

        sendMessage(newMessage);
    };

    return <Widget remoteName={remoteName} messages={messages} typingMessage={typingMessage} onSend={handleSend} />

};



