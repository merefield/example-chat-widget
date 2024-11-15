import {createContext, useContext, useState } from "react";
import OpenAI from "openai";
import { nanoid } from "nanoid";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    
    const [messages, setMessages] = useState([]);

    const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const llmResponse = async (messages) => {
        const system = { role: "system", content: "You are a helpful assistant." }
        const total_messages = [system].concat(messages)

        const openai = new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: total_messages
        });
        return completion.choices[0].message.content;
    }
    
    const sendMessage = async (message) => {

        setMessages(messages.concat(message));

        let result = await llmResponse(messages.concat(message).map(((message) => {
            if (message.direction === "incoming") {
                return { role: "user", content: message.message };
            } else {
                return { role: "assistant", content: message.message };
            }
        })));

        let newMessage = 
            {
                _id: nanoid(),
                message: result,
                sender: "remote",
                direction: "incoming",
            }

        setMessages(messages.concat(message).concat(newMessage));
    }

    const hide = () => {
        window.parent.postMessage("hide", "*");
    }

    return <ChatContext.Provider value={{
        messages,
        sendMessage,
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