import * as React from "react"
import { ProductCard } from "./product-card"
import { listingContainerStyle } from "./product-listing.module.scss"

export function ProductListing({ products }) {
  
  return (
    <div className={listingContainerStyle}>
      {products.map((p) => {
        return (
        <ProductCard product={p} key={p.id} />
      )})}
    </div>
  )
}
