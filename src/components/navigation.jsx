import { graphql, useStaticQuery, Link } from "gatsby"
import React, { useState } from "react"
import slugify from "@sindresorhus/slugify"
import {
  navStyle,
  navLink,
  activeLink,
  dropDownBtn,
} from "./navigation.module.scss"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export function Navigation({ className }) {
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

  const typesVisToggle = typesVisible
    ? {
        visibility: "visible",
        height: "var(--size-input)",
      }
    : {
        visibility: "hidden",
        height: 0,
      }

  return (
    <nav className={navStyle}>
      {/* <nav className={[navStyle, className].join(" ")}> */}
      <nav
        className={navStyle}
        onMouseOverCapture={() => setTypesVisible(true)}
        onMouseOutCapture={() => setTypesVisible(false)}
      >
        <AniLink
          cover="true"
          bg="var(--primary)"
          duration={1}
          // direction="right"
          key="shop"
          className={navLink}
          to="/products/"
          activeClassName={activeLink}
        >
          shop <span className={dropDownBtn}>&#9662;</span>
        </AniLink>
        {productTypes.map((name) => (
          <Link
            cover="true"
            bg="var(--primary)"
            duration={1}
            key={name}
            className={navLink}
            style={typesVisToggle}
            to={`/products/${slugify(name)}`}
          >
            <span
              style={{
                transform: "scale(.9)",
                padding: "3px",
                borderLeft: "1px solid var(--primary)",
              }}
            >
              {" "}
              &nbsp;
              {name}
            </span>{" "}
          </Link>
        ))}
      </nav>
      <AniLink
        cover="true"
        bg="var(--primary)"
        duration={1}
        key="collections"
        className={navLink}
        to="/collections/"
      >
        collections
      </AniLink>
      <AniLink
        cover="true"
        bg="var(--primary)"
        duration={1}
        key="shopInsta"
        className={navLink}
        activeClassName={activeLink}
        to="/shopInsta/"
      >
        shopInsta
      </AniLink>
      <AniLink
        cover="true"
        bg="var(--primary)"
        duration={1}
        key="face"
        className={navLink}
        to="/products/"
      >
        face shapes
      </AniLink>
      <AniLink
        cover="true"
        bg="var(--primary)"
        duration={1}
        key="contact"
        className={navLink}
        activeClassName={activeLink}
        to="/contact/"
      >
        contact
      </AniLink>
    </nav>
  )
}
