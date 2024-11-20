import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChatProvider} from "./ChatProvider";
import {IFrameComponent} from "./iframe";
import {WrapperComponent} from "./wrapper";

const root = ReactDOM.createRoot(document.getElementById('widget-outlet'));
// debugger;
console.log("root", root);
root.render(
  <React.StrictMode>
    <WrapperComponent>
      <IFrameComponent className="chat-frame" title="Chat Widget">
        <link href="https://merefield.github.io/example-chat-widget/index.25a5c776.css" rel="stylesheet" />
        <ChatProvider>
          <App />
        </ChatProvider>
      </IFrameComponent>
    </WrapperComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
