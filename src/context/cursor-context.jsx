import React, { createContext, useState } from 'react'


const defaultValues = {
  cursor: "",
  setCursor: () => {},
}

export const CursorContext = createContext(defaultValues)


export const CursorProvider = ({ children }) => {
  const [cursorState, setCursorState] = useState("default")
  
  const cursorOnProduct = (item, price) => {
    console.log(item)
    setCursorState("onProduct")
    setCursorState({ type: "onProduct", content: item, price })
  }
  const cursorOnCollection = (item) => {
    setCursorState({ type: "onCollection" })
  }
  const cursorDefault = (item) => {
    setCursorState({ type: "default" })
  }
  
  return (
    <CursorContext.Provider
      value={{
        cursorState,
        cursorOnProduct,
        cursorOnCollection,
        cursorDefault,
      }}
    >
      { children }
    </CursorContext.Provider>
  )
}
