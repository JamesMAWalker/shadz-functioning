import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { useLocation } from '@reach/router'

import { CursorContext } from '../context/cursor-context'
import { formatPrice } from "../utils/format-price"
import {
  productCardStyle,
  productHeadingStyle,
  productImageStyle,
  productDetailsStyle,
  hoverImage,
  productPrice,
} from "./product-card.module.scss"

import { searchProductImage, defaultProductImage } from '../pages/search-page.module.scss'

export function ProductCard({ product }) {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    images: [, thirdImage],
    storefrontImages,
  } = product
  
  const location = useLocation()
  
  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  let storefrontImageData = {}
  let modelImageData
  
  modelImageData = {}
  
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node
    const modelImage = storefrontImages.edges[0].node 
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fluid",
        width: 200,
        height: 200,
      })
    } catch (e) {
      
    }
    try {
      modelImageData = getShopifyImage({
        image: modelImage,
        layout: "fluid",
        width: 400,
        height: 400,
      })
    } catch (e) {
      
    }
  }

  const { cursorOnProduct, cursorDefault, cursorState } = React.useContext(CursorContext)

  

  return (
    <AniLink
      cover
      bg="var(--primary)"
      className={productCardStyle}
      to={slug}
      aria-label={`View ${title} product page`}
      onMouseOver={(e) => {
        e.stopPropagation()
        if (location.pathname !== "/search") {
          cursorOnProduct(title, price)
        }
      }}
      onMouseLeave={() => cursorDefault()}
    >
      <div
        className={productImageStyle}
        data-name="product-image-box"
      >
        <GatsbyImage
          alt={firstImage?.altText ?? title}
          imgClassName={firstImage ? defaultProductImage : searchProductImage}
          image={firstImage?.gatsbyImageData ?? storefrontImageData}
        />
      </div>
      <div className={productDetailsStyle}>
        <h2 as="h2" className={productHeadingStyle}>
          {title}
        </h2>
        <div className={productPrice}>{price}</div>
      </div>
      <div className={hoverImage}>
        <GatsbyImage
          alt={thirdImage?.altText ?? null}
          image={thirdImage?.gatsbyImageData ?? null}
        />
      </div>
    </AniLink>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      altText
      gatsbyImageData(aspectRatio: 1, width: 640)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`
