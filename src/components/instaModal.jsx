import React, { useState, useEffect, useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from "gsap/gsap-core"
import FocusTrap from "focus-trap-react"

// Components
import { AddToCart } from "./add-to-cart"
import { CrossIcon } from "../icons/cross"
import InstagramIcon from "../icons/instagram"
import PinterestIcon from "../icons/pinterest"
import FacebookIcon from "../icons/facebook"
import { LinkIcon } from "../icons/link"

// Context
import { LayoutContext } from "../context/layout-context"

import {
  instaModal,
  postImage,
  detailsSection,
  closeButton,
  product,
  productImage,
  productDetails,
  itemName,
  price,
  addToCart,
  postContent,
  postMeta,
  postUser,
  postTime,
  shareIcons,
  // TODO - move the below to separate module
  mobileInstaModal,
  mImageSection,
  mCloseButton,
  mPostImage,
  mProductSection,
  mProductImage,
  mProductDetails,
  mAddToCart,
  mName,
  mPrice,
  mPostCaption,
  mPostMeta,
  mShareSection,
} from "./instaModal.module.scss"

export const InstaModal = ({ hideModal, post, getProductFromPost }) => {
  const { modalOpen } = useContext(LayoutContext)
  const productInPost = getProductFromPost(post.caption)[0].node

  const postImageData = getImage(
    post.localImage.childImageSharp.gatsbyImageData
  )
  const productImageData = getImage(
    productInPost.product.images[0].gatsbyImageData
  )

  const animateModalClose = () => {
    gsap.to(".mobile-modal", {
      opacity: 0,
      y: "-20vh",
      duration: 0.5,
      ease: "expo.inOut",
      onComplete: () => hideModal(),
    })
  }

  // close modal with esc key
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        animateModalClose()
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [hideModal])

  // set mobile breakpoint for alternate modal component
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const tabBP = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tablet",
        10
      )
    )
    setIsMobile(window.innerWidth <= tabBP)
  }, [isMobile])

  useEffect(() => {
    setTimeout(() => {
      gsap.to(".mobile-modal", {
        opacity: 1,
        y: 0,
        ease: "expo.inOut",
        duration: 0.5,
      })
    }, 200)
  }, [modalOpen])

  const timeComponents = post.timestamp.split("-")

  return (
    <>
      {!isMobile ? (
        <FocusTrap active={modalOpen}>
          <div className={instaModal}>
            <section
              className={postImage}
              aria-label={`insta post showing ${productInPost.displayName}`}
            >
              <GatsbyImage alt={post.caption} image={postImageData} />
            </section>
            <section className={detailsSection}>
              <div className={product}>
                <div
                  className={closeButton}
                  tabIndex={0}
                  aria-role="button"
                  aria-label="close insta modal"
                  onClick={hideModal}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      hideModal()
                    }
                  }}
                >
                  <span className="visually-hidden">close insta modal</span>
                  <CrossIcon />
                </div>
                <div className={productImage}>
                  <GatsbyImage
                    alt={productInPost.displayName}
                    image={productImageData}
                  />
                </div>
                <div className={productDetails}>
                  <div className={itemName}>{productInPost.product.title}</div>
                  {/* <div className={variantName}>{productInPost.title}</div> */}
                  <div className={price}>${12}</div>
                </div>
                <div className={addToCart}>
                  <AddToCart
                    variantId={productInPost.storefrontId}
                    quantity={1}
                    available={productInPost.availableForSale}
                  />
                </div>
              </div>
              <div className={postContent}>
                <p>"{`${post.caption}`.slice(0, 75)}..."</p>
              </div>
              <div className={postMeta}>
                <span className={postUser}>
                  <a href={post.permalink}>@{post.username}</a>
                </span>
                <span>//</span>
                <span className={postTime}>
                  {timeComponents[0][0] !== "0"
                    ? timeComponents[0]
                    : timeComponents[0][1]}
                  .
                  {timeComponents[1][0] !== "0"
                    ? timeComponents[1]
                    : timeComponents[1][1]}
                  .{timeComponents[2].slice(2)}
                </span>
              </div>
              <div className={shareIcons}>
                <a href={post.permalink}>
                  <span
                    className="visually-hidden"
                    aria-label="facebook share button"
                  >
                    share to facebook
                  </span>
                  <FacebookIcon />
                </a>
                <a href={post.permalink}>
                  <span
                    className="visually-hidden"
                    aria-label="instagramshare button"
                  >
                    share to instagram
                  </span>
                  <InstagramIcon />
                </a>
                <a href={post.permalink}>
                  <span
                    className="visually-hidden"
                    aria-label="pinterest share button"
                  >
                    pin this post
                  </span>
                  <PinterestIcon />
                </a>
                <a href={post.permalink}>
                  <span
                    className="visually-hidden"
                    aria-label="copy link button"
                  >
                    copy post link
                  </span>
                  <LinkIcon />
                </a>
              </div>
            </section>
          </div>
        </FocusTrap>
      ) : (
        <>
          <FocusTrap active={modalOpen}>
            <div
              className={`${mobileInstaModal} mobile-modal`}
              onClick={animateModalClose}
            >
              <div className={mImageSection}>
                <span className={mCloseButton} onClick={animateModalClose}>
                  <CrossIcon />
                </span>
                <figure className={mPostImage}>
                  <GatsbyImage image={postImageData} alt={post.caption} />
                </figure>
              </div>
              <div className={mProductSection}>
                <figure className={mProductImage}>
                  <GatsbyImage
                    image={productImageData}
                    alt={product.displayName}
                  />
                </figure>
                <figcaption className={mProductDetails}>
                  <p className={mName}>{productInPost.product.title}</p>
                  <span className={mPrice}>${12}</span>
                </figcaption>
              </div>
              <div className={mAddToCart}>
                <AddToCart
                  variantId={productInPost.storefrontId}
                  quantity={1}
                  available={productInPost.availableForSale}
                />
              </div>
              <figcaption className={mPostCaption}>
                <p>{post.caption.slice(0, 95)}</p>
              </figcaption>
              <div className={mPostMeta}>
                <span className={postUser}>
                  <a href={post.permalink}>@{post.username}</a>
                </span>
                <span>//</span>
                <span className={postTime}>
                  {timeComponents[0][0] !== "0"
                    ? timeComponents[0]
                    : timeComponents[0][1]}
                  .
                  {timeComponents[1][0] !== "0"
                    ? timeComponents[1]
                    : timeComponents[1][1]}
                  .{timeComponents[2].slice(2)}
                </span>
              </div>
              <div className={mShareSection}>
                <a href={post.permalink}>
                  <FacebookIcon />
                </a>
                <a href={post.permalink}>
                  <InstagramIcon />
                </a>
                <a href={post.permalink}>
                  <PinterestIcon />
                </a>
                <a href={post.permalink}>
                  <LinkIcon />
                </a>
              </div>
            </div>
          </FocusTrap>
        </>
      )}
    </>
  )
}
