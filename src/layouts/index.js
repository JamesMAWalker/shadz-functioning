import React, { useContext, useEffect, useRef, useState } from "react"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

import { SkipNavLink } from "../components/skip-nav"
import { Seo } from "../components/seo"
import { NavLeft } from '../components/nav-left';
import { NavRight } from '../components/nav-right';
import { MobileMenu } from '../components/parent-mobile-menu';
import { useWindowSize } from '../utils/hooks';
import { CustomCursor } from '../components/custom-cursor';
import { CursorContext } from '../context/cursor-context';

import { layout, scrollWrap } from './index.module.scss';
import '../styles/locomotive-scroll.css';


const httpLink = new HttpLink({
  uri: "https://sunkissed-heroku-db.herokuapp.com/v1/graphql",
  fetch,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default function Layout({ children }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const windowSize = useWindowSize()
  const { cursorState, cursorOnProduct, cursorDefault } = useContext(CursorContext)
  

  useEffect(() => {
    // set mobile viewport units
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--mVh", `${vh}px`)

    // set breakpoint for JS
    const tabBP = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tablet",
        10
      )
    )
    setIsMobile(window.innerWidth <= tabBP)
  }, [isMobile, windowSize])

  return (
    <ApolloProvider client={client}>
      <div className={layout} onMouseOver={() => cursorDefault()}>
        <CustomCursor cursorState={cursorState} />
        <Seo />
        <SkipNavLink />
        {!isMobile ? (
          <NavLeft />
        ) : (
          <MobileMenu
            toggleMenu={() => setMenuOpen(!menuOpen)}
            menuOpen={menuOpen}
          />
        )}
        <div className={scrollWrap} data-scroll-container ref={containerRef}>
          <main>{children}</main>
        </div>
        {!isMobile && <NavRight />}
      </div>
    </ApolloProvider>
  )
}
