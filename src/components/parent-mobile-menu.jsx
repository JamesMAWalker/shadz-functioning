import React, { useContext, useEffect } from "react"
import { StoreContext } from "../context/store-context"
import { LayoutContext } from '../context/layout-context';
import gsap from 'gsap'
import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Logo from "../icons/logo"
import { Toast } from "./toast"
import { CartButton } from "./cart-button"
import { MobileIcons } from './mobile-icons'
import { MobileNavigation } from './mobile-nav'
import SocialLinks from "./social-links"

import { menuOpenAnimation, menuCloseAnimation } from '../animations/mobileMenu.animations'
import {
  mobileMenu,
  mobileSocial,
  menuButton,
  menuContent,
  menuHeader,
  closeButton,
  logoWrapper,
  cartWrapper,
} from "./parent-mobile-menu.module.scss"


const MenuButton = ({ toggleMenu, menuOpen }) => {
  
  // menu button animation
  useEffect(() => {
    gsap.set(".close-button", {
      transformOrigin: "bottom",
      y: "5px",
      scale: 1.25,
    })
  }, [menuOpen])
  
  // TODO - improve button animation and make simultaneous with other starting animation.
  return (
    <div
      className={`${menuButton} ${menuOpen && closeButton}`}
      onClick={toggleMenu}
    >
      {menuOpen && <div className="close-button" style={{ opacity: 0, fontSize: "var(--text-3xl)" }}>&times;</div>}
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export const MobileMenu = ({ menuOpen, toggleMenu }) => {
  const { checkout, loading, didJustAddToCart } = useContext(StoreContext)
  const { modalOpen } = useContext(LayoutContext)

  // checkout functionality
  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  // menu open/close functions and animations
  const conditionalClose = () => {
    if (menuOpen) {
      toggleMenu()
    } else {
      return
    }
  }

  useEffect(() => {
    const menuTl = gsap.timeline()
      if (menuOpen) {
        menuOpenAnimation(menuTl, menuOpen)
      } else {
        menuCloseAnimation(menuTl, menuOpen)
      }
  }, [menuOpen])

  useEffect(() => {
    if (modalOpen) {
      gsap.to(".mobile-menu", {
        opacity: 0,
        duration: 0.5,
      })
      gsap.to(".mobile-menu", {
        delay: 0.5,
        zIndex: -1,
      })
    } else {
      gsap.to(".mobile-menu", {
        zIndex: 200,
      })
      gsap.to(".mobile-menu", {
        duration: 0.5,
        delay: 0.5,
        opacity: 1,
      })
    }
  }, [modalOpen])

  

  return (
    <>
      <div className={`${mobileMenu} mobile-menu`}>
        <div className={`${menuHeader} menu-header`}>
          <div className={logoWrapper}>
            <AniLink cover="true" bg="var(--primary)" to="/">
              <div onClick={conditionalClose}>
                <Logo />
              </div>
            </AniLink>
          </div>
          <div className={cartWrapper}>
            {!menuOpen ? <CartButton quantity={quantity} /> : <span />}
          </div>
          <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>
          <div className={`menu-content ${menuContent}`}>
            <MobileIcons toggleMenu={conditionalClose} />
            <MobileNavigation
              toggleMenu={conditionalClose}
              menuOpen={menuOpen}
            />
            <SocialLinks classN={`mobile-social ${mobileSocial}`} />
          </div>
      </div>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
    </>
  )
}
