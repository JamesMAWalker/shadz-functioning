import { graphql, useStaticQuery, Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import React, { useState } from "react"
import slugify from "@sindresorhus/slugify"

import {
  mobileNavStyle,
  navLink,
  activeLink,
  dropDownBtn,
} from "./mobile-nav.module.scss"

export function MobileNavigation({ toggleMenu, menuOpen }) {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  const [typesVisible, setTypesVisible] = useState(false)

  const openTypesMenu = (e) => {
    e.stopPropagation()
    
    setTypesVisible(!typesVisible)
  }

  const menuToggleTest = (params) => {
    // setTimeout(() => {
    //   toggleMenu()
    // }, 200);
  }
  
  const activeDropDown = {
    background: typesVisible ? "var(--primary)" : "transparent",
    transform: typesVisible
      ? "rotate(0deg) translateY(2px) scale(1.75)"
      : "rotate(-90deg) translateY(2px) scale(1.75)",
  }

  return (
    <nav className={mobileNavStyle} onTouchStart={menuToggleTest}>
      <AniLink
        cover="true"
        bg="var(--primary)"
        key="products"
        className={`menu-link ${navLink}`}
        to="/products/"
        activeClassName={activeLink}
        onClick={toggleMenu}
      >
        shop{" "}
        <span
          onTouchStartCapture={openTypesMenu}
          className={dropDownBtn}
          style={activeDropDown}
          onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }
          }
        >
          &#9662;
        </span>
      </AniLink>
      {typesVisible &&
        productTypes.map((name) => (
          <AniLink
            cover="true"
            bg="var(--primary)"
            key={name}
            className={`menu-link ${navLink}`}
            to={`/products/${slugify(name)}`}
            onClick={toggleMenu}
          >
            <span style={{ transform: "scale(.75)", padding: "3px" }}>
              {" "}
              &nbsp;
            </span>{" "}
            {name}
          </AniLink>
        ))}
      <AniLink
        cover="true"
        bg="var(--primary)"
        key="collections"
        className={`menu-link ${navLink}`}
        to="/collections/"
        activeClassName={activeLink}
        onClick={toggleMenu}
      >
        collections
      </AniLink>
      <AniLink
        cover="true"
        bg="var(--primary)"
        key="insta"
        className={`menu-link ${navLink}`}
        to="/shopInsta/"
        activeClassName={activeLink}
        onClick={toggleMenu}
      >
        shop insta
      </AniLink>
      <AniLink
        cover="true"
        bg="var(--primary)"
        key="faces"
        className={`menu-link ${navLink}`}
        to="/products/"
        activeClassName={activeLink}
        onClick={toggleMenu}
      >
        face shapes
      </AniLink>
      <AniLink
        cover="true"
        bg="var(--primary)"
        key="contact"
        className={`menu-link ${navLink}`}
        to="/contact/"
        activeClassName={activeLink}
        onClick={toggleMenu}
      >
        contact
      </AniLink>
    </nav>
  )
}
