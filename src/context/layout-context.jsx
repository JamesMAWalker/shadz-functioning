import React, { createContext, useState } from "react"

const defaultValues = {
  modalOpen: false,
  setModalOpen: () => {},
}

export const LayoutContext = createContext(defaultValues)

export const LayoutProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <LayoutContext.Provider
      value={{
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
