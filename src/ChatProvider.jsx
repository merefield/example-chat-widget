import {createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { StarButton } from "chat-ui-kit-react";
import { useIsMinimised } from './wrapper';

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    
    const [messages, setMessages] = useState([]);
    const [typingMessage, setTypingMessage] = useState("");
    const isMinimised = useIsMinimised();

    
    const sendMessage = async (message) => {

        setMessages(messages.concat(message));

        if (message.direction === "outgoing") {
            setTypingMessage("Assistant is typing");

            let result = "ECHO: " + message.message;

            let newMessage =
                {
                    _id: nanoid(),
                    message: result,
                    sender: "remote",
                    direction: "incoming",
                }
            setTypingMessage("");
            setMessages(messages.concat(message).concat(newMessage));
        }
    }

    const hide = () => {
        window.parent.postMessage("hide", "*");
    }

    const show = () => {
        window.parent.postMessage("show", "*");
    }

    return isMinimised === false ? (<ChatContext.Provider value={{
        messages,
        sendMessage,
        typingMessage,
        hide
    }}>{children}</ChatContext.Provider>) :
        (<div><StarButton onClick={show}></StarButton></div>);
    
}

export const useChat = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error("useChatContext must be within ChatProvider");
    }

    return context;

}