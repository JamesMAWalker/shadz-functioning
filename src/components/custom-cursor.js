import React, { useContext, useEffect, useRef } from "react"
import debounce from "lodash.debounce"

import { CursorContext } from '../context/cursor-context';
// import { cursorStyles, product, productButton, collection, collectionButton } from "./custom-cursor.module.scss"
import { cursorStyles, product, productButton } from "./custom-cursor.module.scss"

export const CustomCursor = ({ cursorState }) => {
  
  const cursorRef = useRef(null)
  
  const cursorShapeGetter = (params) => {
    let cursorShape
    if (cursorState?.type === "onProduct") cursorShape = product
    // if (cursorState?.type === "onCollection") cursorShape = collection
    
    return cursorShape
  }
  

  useEffect(() => {}, [cursorState])

  useEffect(() => {
    const onMouse = (e) => {
      const { clientX, clientY } = e
      const mouseX = clientX - cursorRef.current.clientWidth / 2
      const mouseY = clientY - cursorRef.current.clientHeight / 2
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    document.addEventListener("mousemove", onMouse)
    return () => {
      document.removeEventListener("mousemove", onMouse)
    }
  }, [cursorRef])

  return (
    <div className={`${cursorStyles} ${cursorShapeGetter()}`} ref={cursorRef}>
      <div className={productButton} style={{ cursor: "none !important" }}>
        {cursorState?.type ? (
          <span>
            {cursorState?.content?.replace("|", "")} <br /> {cursorState.price}
          </span>
        ) : (
          <span>View Product</span>
        )}
      </div>
      {/* <div className={collectionButton} style={{ cursor: "none !important" }}>
        View <br />
      </div> */}
    </div>
  )
}
