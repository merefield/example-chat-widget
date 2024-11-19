import React, { useEffect } from 'react'

export const WrapperComponent = ({
  children,
  ...props
}) => {
  useEffect(() => {
    const handler = event => {
      // debugger;
      const data = event.data
      console.log("Hello World?", data)
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
    }, []) 

  return (
    <div className="chat-wrapper">
      {children}
    </div>
  )
}