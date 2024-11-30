import "chat-ui-kit-styles/docs/default/styles.min.css";
import { MainContainer, ChatContainer, ConversationHeader, MessageList, Message,
MessageInput, Button, TypingIndicator } from "chat-ui-kit-react";
import { useChat } from "./ChatProvider";

export const Widget = ({remoteName = "", messages = [], typingMessage = "", onSend}) => {
    
    const { hide } = useChat();
    
    return (<MainContainer>
        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content userName={remoteName} />
                <ConversationHeader.Actions>
                    <Button onClick={hide}>Hide</Button>
                </ConversationHeader.Actions>
            </ConversationHeader>
    
            <MessageList>
                {messages.map( message =>
                    <Message key={message._id} model={message} />
                )}
                {typingMessage && <TypingIndicator content={typingMessage} />}
            </MessageList>
    
            <MessageInput placeholder="Type message here"
                          attachButton={false}
                          onSend={onSend}
            />
        </ChatContainer>
    </MainContainer>);
    
};


