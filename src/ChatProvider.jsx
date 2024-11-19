import {createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    
    const [messages, setMessages] = useState([]);
    const [typingMessage, setTypingMessage] = useState("");

    
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

    return <ChatContext.Provider value={{
        messages,
        sendMessage,
        typingMessage,
        hide
    }}>{children}</ChatContext.Provider>
    
}

export const useChat = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error("useChatContext must be within ChatProvider");
    }

    return context;

}