import React, { createContext, useContext, useEffect, useState } from 'react'

const MinimisedContext = createContext();

export const WrapperComponent = ({
  children,
  ...props
}) => {

  const [isMinimised, setIsMinimised] = useState(false);
  let className = "chat-wrapper";

  useEffect(() => {
    const handler = event => {
      const data = event.data

      if (data === "hide") {
        setIsMinimised(true);
      }
      if (data === "show") {
        setIsMinimised(false);
      }

      if (isMinimised) {
        // className = "chat-wrapper hidden";
        console.log("hidden ", data)
      } else {
        // className = "chat-wrapper";
      }
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
    }, []) 

  return (
    <MinimisedContext.Provider value={isMinimised}>
      <div className={isMinimised ? 'chat-wrapper minimised' : 'chat-wrapper'}>
        {children}
      </div>
    </MinimisedContext.Provider>
  )
}

// Custom Hook for accessing the context
export const useIsMinimised = () => {
  return useContext(MinimisedContext);
};