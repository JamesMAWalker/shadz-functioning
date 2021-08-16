import * as React from "react"
import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import CartIcon from "../icons/cart"
import { cartButton, badge } from "./cart-button.module.css"

export function CartButton({ quantity }) {
  return (
    <AniLink
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
      <CartIcon />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </AniLink>
  )
}
