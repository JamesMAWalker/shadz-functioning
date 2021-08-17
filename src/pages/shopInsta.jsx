import React, { useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { LayoutContext } from '../context/layout-context'
import gsap from "gsap"

// Components
import { InstaModal } from '../components/instaModal'

// Styles
import {
  instaContainer,
  instaPost,
  loadMoreButton,
} from "./shopInsta.module.scss"

const ShopInsta = ({ data, transitionStatus }) => {
  const {
    allInstagramContent: { edges: allPosts },
  } = data
  const {
    allShopifyProductVariant: { edges: variants },
  } = data

  const [postList, setPostList] = useState([...allPosts.slice(0, 26)])
  const [curPost, setCurPost] = useState(postList[0].node)
  const [isMobile, setIsMobile] = useState(false)
  const { modalOpen, setModalOpen } = useContext(LayoutContext)

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
    if (modalOpen && !isMobile) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = "scroll"
    }
  }, [modalOpen, isMobile])

  // Page Transition
  useEffect(() => {
    // set default state
    gsap.to(".page-container--insta", {
      delay: 0.5,
      autoAlpha: 1,
    })

    if (transitionStatus === "entering") {
      gsap.from(".page-container--insta", {
        delay: 0.5,
        autoAlpha: 0,
      })
    } else if (transitionStatus === "exiting") {
      gsap.to(".page-container--insta", {
        autoAlpha: 0,
      })
    }
  }, [transitionStatus])

  // set modal content
  const getProductFromPost = (caption) => {
    return variants.filter(({ node: v }) => {
      return caption
        .toLowerCase()
        .includes(
          `#${v.product.title
            .toLowerCase()
            .replace(" ", "")
            .replace("|", "")}sunglasses`
        )
    })
  }
  const setModalContentAndShow = (post) => {
    if (getProductFromPost(post.caption)?.length === 0) {
      return
    }
    setCurPost(post)
    setTimeout(() => {
      setModalOpen(true)
    }, 200)
  }

  // set/add posts to display
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(allPosts.length > 11)

  const handleLoadMore = () => {
    setLoadMore(true)
  }

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = postList.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore
        ? allPosts.slice(currentLength, currentLength + 18)
        : []
      setPostList([...postList, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = postList.length < allPosts.length
    setHasMore(isMore)
  }, [postList])

  return (
    <div className={`${instaContainer} page-container--insta`}>
      {postList.map(({ node: thisPost }) => {
        const postImageData = getImage(
          thisPost.localImage.childImageSharp.gatsbyImageData
        )
        return (
          <div
            key={thisPost.id}
            className={instaPost}
            tabIndex={0}
            onClick={() => setModalContentAndShow(thisPost)}
            aria-label="instagram thumbnail"
            aria-modal="true"
          >
            <GatsbyImage alt={`instagram post caption: ${thisPost.caption.slice(0, 50)}`} image={postImageData} />
          </div>
        )
      })}
      <div className={loadMoreButton}>
        <button onClick={handleLoadMore} aria-label="load more instagram posts button">
          <span>Load</span>
          <span>More</span>
          <span>+</span>
        </button>
      </div>
      {modalOpen && (
        <InstaModal
          post={curPost}
          getProductFromPost={getProductFromPost}
          hideModal={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ShopInsta

export const query = graphql`
  query InstaQuery {
    allInstagramContent {
      edges {
        node {
          id
          caption
          username
          timestamp(formatString: "MM-DD-YYYY")
          permalink
          localImage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 900
                quality: 70
                formats: [AVIF, WEBP]
                placeholder: DOMINANT_COLOR
              )
            }
          }
        }
      }
    }
    allShopifyProductVariant {
      edges {
        node {
          displayName
          id
          storefrontId
          title
          price
          availableForSale
          product {
            title
            images {
              gatsbyImageData(layout: CONSTRAINED, width: 500)
            }
          }
        }
      }
    }
  }
`
