import React, { useEffect, useState } from 'react'

export const WrapperComponent = ({
  children,
  ...props
}) => {

  const [isMinimised, setIsMinimised] = useState(false);
  let className = "chat-wrapper";

  useEffect(() => {
    const handler = event => {
      // debugger;
      const data = event.data
      debugger;
      if (data === "hide") {
        setIsMinimised(true);
      }
      if (isMinimised) {
        className = "chat-wrapper hidden";
        console.log("hidden ", data)
      } else {
        className = "chat-wrapper";
      }
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
    }, []) 

  return (
    <div className={className}>
      {children}
    </div>
  )
}