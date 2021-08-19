import React, { useCallback, useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import isEqual from "lodash.isequal"
import debounce from "lodash.debounce"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../../../context/store-context"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, gql } from "@apollo/client"
import gsap from "gsap"

import { genColorOptions } from "../../../utils/gen-colors"
import { useWindowSize } from "../../../utils/hooks"
import { AddToCart } from "../../../components/add-to-cart"
import { formatPrice } from "../../../utils/format-price"
import { Seo } from "../../../components/seo"
import HeartIcon from "../../../icons/heart"
import {
  productBox,
  header,
  imageScrollWrapper,
  imageListItem,
  scrollIndicator,
  productImageWrapper,
  productImageList,
  portraitFit,
  noImagePreview,
  optionsWrapper,
  colorOption,
  currOption,
  activeColorOption,
  subHeader,
  heart,
  filled,
  empty,
  selectVariant,
  // breadcrumb,
  addToCartStyle,
  metaSection,
  productDetails,
  headerContainer,
  colorsContainer,
} from "./product-page.module.scss"

const CUSTOMER_QUERY = gql`
  query MyQuery($_email: String = "") {
    Customers(where: { email: { _eq: $_email } }) {
      wishlist
    }
  }
`

// $wishlist must be in form: "{item1, item2}"
const UPDATE_WISHLIST = gql`
  mutation MyMutation($email: String = "", $wishlist: _text = "") {
    update_Customers(
      where: { email: { _eq: $email } }
      _set: { wishlist: $wishlist }
    ) {
      returning {
        wishlist
      }
    }
  }
`

export default function Product({
  data: { product },
  // transitionStatus
}) {
  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  // set breakpoint for JS
  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024)
  }, [isMobile, windowSize])

  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product
  const { client } = useContext(StoreContext)
  const { user, isAuthenticated, isLoading } = useAuth0()

  const { loading: customerLoading, data: customerData, refetch } = useQuery(
    CUSTOMER_QUERY,
    {
      variables: { _email: user?.email },
    }
  )

  const [updateDbWishlist] = useMutation(UPDATE_WISHLIST)

  const [itemInWishlist, setItemInWishlist] = useState(false)

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity] = useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)

  // > ------------ Availability and Price Handling ------------ < //
  const checkAvailablity = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2?.minVariantPrice.currencyCode,
    variant?.price
  )

  const hasVariants = variants.length >= 1
  const hasImages = images.length > 0
  // const hasMultipleImages = images.length > 1

  // > ------------ Color Option Changes ------------< //
  const handleOptionChange = (index, value) => {
    if (value === "" || value === null || isLoading) {
      return
    }
    const currentOptions = [...variant.selectedOptions]
    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }
    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })
    setVariant({ ...selectedVariant })
  }

  // > ------------ Wishlist Handling ------------ < //
  const checkProductInWishlist = debounce(() => {
    if (
      isAuthenticated &&
      customerData !== undefined &&
      !isLoading &&
      customerData.Customers[0].wishlist
    ) {
      const wishlist = customerData.Customers[0].wishlist
      setItemInWishlist(wishlist?.includes(variant.id))
    }

    // setItemInWishlist(wishlist.includes(variant.id))
    return itemInWishlist
  }, 500)

  // Set itemInWishlist whenever variant or customer changes
  useEffect(() => {
    if (customerData !== undefined) {
      checkProductInWishlist()
    }
  }, [variant, customerData, checkProductInWishlist])

  // Once product and user info loaded, call compare fn
  useEffect(() => {
    if (isAuthenticated && !customerLoading) {
      refetch({
        variables: { _email: user.email },
      })
      checkProductInWishlist()
    }
  }, [
    user,
    refetch,
    isAuthenticated,
    customerLoading,
    customerData,
    checkProductInWishlist,
  ])

  // If in list, useMutation to remove from list
  const addRemoveFromWishlist = () => {
    const dbWishlist =
      customerData !== undefined ? customerData.Customers[0].wishlist : null

    if (dbWishlist?.includes(variant.id) && isAuthenticated) {
      if (customerLoading) {
        return
      }
      const itemRemovedWishlist = dbWishlist.filter((wli) => wli !== variant.id)

      updateDbWishlist({
        variables: {
          email: user.email,
          wishlist: `{${itemRemovedWishlist.map((wli) => wli)}}`,
        },
      })
      refetch()
      setItemInWishlist(false)
    } else {
      refetch()
      if (customerLoading) {
        return
      }
      const itemAddedWishlist = [...dbWishlist, variant.id]
      updateDbWishlist({
        variables: {
          email: user.email,
          wishlist: `{${itemAddedWishlist.map((wli) => wli)}}`,
        },
      })
      setItemInWishlist(true)
    }
  }

  // Indicate scroll possible on mobile
  useEffect(() => {
    gsap.from("#scroll-indicator", {
      duration: 1,
      opacity: 0,
    })
    gsap.to("#scroll-indicator", {
      delay: 2,
      duration: 3,
      opacity: 0,
    })
  }, [])

  if (!product) {
    return null
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        image={getSrc(firstImage.gatsbyImageData)}
      />
      <main data-scroll-container className="page-container--product">
        <div>
          <div className={productBox}>
            {hasImages && (
              <div className={productImageWrapper}>
                <span id="scroll-indicator" className={scrollIndicator}>
                  scroll for more &rarr;
                </span>
                <div
                  className={imageScrollWrapper}
                  role="group"
                  aria-label="gallery"
                  aria-describedby="instructions"
                >
                  {hasImages ? (
                    <ul className={productImageList}>
                      {isMobile
                        ? images.slice(0, 4).map((image, index) => {
                            return (
                              <li
                                className={imageListItem}
                                key={`product-image-${index}`}
                              >
                                <GatsbyImage
                                  objectFit="contain"
                                  // imgStyle
                                  alt={
                                    image.altText
                                      ? image.altText
                                      : `Product Image of ${title} #${
                                          index + 1
                                        }`
                                  }
                                  image={image.gatsbyImageData}
                                />
                              </li>
                            )
                          })
                        : images.map((image, index) => {
                            const portraitOriented =
                              image.gatsbyImageData.height >
                              image.gatsbyImageData.width

                            return (
                              <li
                                key={`product-image-${index}`}
                                className={`${portraitOriented && portraitFit}`}
                              >
                                <GatsbyImage
                                  objectFit="contain"
                                  alt={
                                    image.altText
                                      ? image.altText
                                      : `Product Image of ${title} #${
                                          index + 1
                                        }`
                                  }
                                  // imgStyle={{ opacity: portraitOriented ? .5 : 1 }}
                                  image={image.gatsbyImageData}
                                />
                              </li>
                            )
                          })}
                    </ul>
                  ) : (
                    <span className={noImagePreview}>No Preview image</span>
                  )}
                </div>
              </div>
            )}

            <div className={productDetails}>
              {/* <div className={breadcrumb}>
                <Link to={product.productTypeSlug}>{product.productType}</Link>
                <ChevronIcon size={12} />
              </div> */}
              <div className={headerContainer}>
                <h1 className={header}>{title}</h1>
                <h2 className={subHeader}>
                  <span>{price}</span>
                  {isAuthenticated && (
                    <span
                      tabIndex={0}
                      role="button"
                      // onClick={addRemoveFromWishlist}
                      onTouchStart={isMobile && addRemoveFromWishlist}
                      aria-label={
                        itemInWishlist
                          ? `${variant.title} in wishlist, click to remove`
                          : `add ${variant.title} to wishlist`
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addRemoveFromWishlist()
                        }
                      }}
                    >
                      <HeartIcon
                        classN={`${heart} ${itemInWishlist ? filled : empty}`}
                      />
                    </span>
                  )}
                </h2>
              </div>
              <div className={colorsContainer}>
                <h4>colors</h4>
                <fieldset className={optionsWrapper}>
                  {hasVariants &&
                    options[0].values.map((value, index) => {
                      let swatch = genColorOptions(value)
                      if (value.includes("RAINBOW")) {
                        swatch = `linear-gradient(319deg, #91d370 0%, #bca0ff 37%, #f2cd54 100%)`
                      }

                      const itemSwatch =
                        typeof swatch === "object"
                          ? `linear-gradient(${swatch[0]} 50%, ${swatch[1]} 50%)`
                          : `${swatch}`

                      const activeSelection =
                        value === variant.title ? activeColorOption : ""

                      return (
                        <div className={selectVariant} key={value}>
                          <div
                            className={colorOption}
                            id={value}
                            style={{
                              background: itemSwatch,
                              border: `2px solid lightgrey`,
                              transform: "rotate(-45deg)",
                            }}
                            name="options"
                            aria-label={`${value} color option`}
                            tabIndex={0}
                            role="button"
                            value={value}
                            onClick={(event) => {
                              const val = event.target.getAttribute("value")
                              handleOptionChange(0, val)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const val = e.target.getAttribute("value")
                                handleOptionChange(0, val)
                              }
                            }}
                          >
                            <span className={activeSelection}>
                              <span className="visually-hidden">{value}</span>
                            </span>
                          </div>
                        </div>
                      )
                    })}
                </fieldset>
                <p className={currOption}>
                  <span className="visually-hidden">
                    currently selected color option is{" "}
                  </span>
                  {variant.title}
                </p>
              </div>
              <div className={metaSection}>
                <span>+ stainless steel frame</span>
                <span>+ antiglare lens</span>
                <span></span>
                {product.description}
                {/* <span className={labelFont}>Type</span>
                <span className={tagList}>
                  <Link to={product.productTypeSlug}>
                    {product.productType}
                  </Link>
                </span>

                <span className={labelFont}>Tags</span>
                <span className={tagList}>
                  {product.tags.map((tag) => (
                    <Link to={`/search?t=${tag}`}>{tag}</Link>
                  ))}
                </span> */}
              </div>
              <div className={addToCartStyle}>
                <AddToCart
                  variantId={productVariant.storefrontId}
                  quantity={quantity}
                  available={available}
                  variantTitle={`${title} ${variant.title}`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        gatsbyImageData(layout: CONSTRAINED, width: 900)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        id
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`


