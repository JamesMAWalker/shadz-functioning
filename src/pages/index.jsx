// import React, { useContext, useEffect, useState } from "react"
// import { graphql, Link } from "gatsby"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// // import TransitionLink from "gatsby-plugin-transition-link"
// import gsap from "gsap/gsap-core"

// import {
//   collage,
//   collageRow,
//   photo,
//   transitionShade,
// } from "./index.module.scss"
// import { CursorContext } from "../context/cursor-context"

// export default function IndexPage({ data }) {
//   const [, setIsMobile] = useState(false)
//   const { cursorOnCollection, cursorDefault } = useContext(CursorContext)

//   // set breakpoint for JS
//   useEffect(() => {
//     const tabBP = parseInt(
//       getComputedStyle(document.documentElement).getPropertyValue(
//         "--tablet",
//         10
//       )
//     )
//     setIsMobile(window.innerWidth <= tabBP)
//   }, [])

//   const images = data.photos.edges.map((p) => getImage(p.node))

//   const collectionMatrix = {
//     0: `/products/shield/shield`,
//     1: `/products/square/lauren-sunglasses`,
//     2: `/products/shield/shield`,
//     3: `/products/classic/solo`,
//     4: `/products/classic/catherine`,
//     5: `products/cateye/barbie-pink-princess-metal-cat-eye-oversized-mirror-lens-women-sunglasses-astr`,
//     6: `/products/classic/round-sunglasses`,
//     7: `/products/classic/round-sunglasses`,
//     8: `/products/square/lauren-sunglasses`,
//     9: `/products/shield/shield`,
//     10: `products/cateye/xl-posche-oversized-women-sunglasses-aviator-flat-top-square-shadz`,
//     11: `/products/classic/round-sunglasses`,
//   }
//   const linkAnimation = (idx) => {
//     const transitionTL = gsap.timeline({
//       ease: "expo.inOut",
//     })

//     transitionTL
//       .to(`.index-photo--${idx} img`, {
//         duration: 0.5,
//         filter: "grayscale(100%)",
//       })
//       .to(
//         `.index-photo--${idx} img`,
//         {
//           duration: 0.5,
//           scale: 1.5,
//         },
//         "<"
//       )
//       .to(
//         `.transition-shade--${idx}`,
//         {
//           duration: 0.5,
//           opacity: 0.6,
//         },
//         "<"
//       )
//   }

//   return (
//     <section className={`${collage} page-container--index`}>
//       {images.map((img, idx) => {
//         const id = data.photos.edges[idx].node.id
//         if (idx !== 0 && idx % 2 !== 0) {
//           const img1 = idx - 1
//           const img2 = idx
//           return (
//             <div className={collageRow} key={id}>
//               <Link
//                 role="presentation"
//                 className={`${photo} index-photo--${img1}`}
//                 onMouseOver={() => cursorOnCollection()}
//                 onFocus={() => cursorOnCollection()}
//                 onMouseLeave={() => cursorDefault()}
//                 to={collectionMatrix[idx - 1]}
//                 exit={{ length: 1 }}
//                 entry={{ length: 1 }}
//               >
//                 <div
//                   className={`${transitionShade} transition-shade--${img1}`}
//                 />
//                 <GatsbyImage
//                   loading="eager"
//                   alt="summer edit 2021 collection image"
//                   image={images[img1]}
//                   onClick={() => linkAnimation(img1)}
//                 />
//               </Link>
//               <Link
//                 className={`${photo} index-photo--${img2}`}
//                 role="presentation"
//                 onMouseOver={() => cursorOnCollection()}
//                 onMouseLeave={() => cursorDefault()}
//                 onFocus={() => cursorOnCollection()}
//                 to={collectionMatrix[idx]}
//               >
//                 <div
//                   className={`${transitionShade} transition-shade--${img2}`}
//                 />
//                 <GatsbyImage
//                   loading="eager"
//                   alt="summer edit 2021 collection image"
//                   onClick={() => linkAnimation(img2)}
//                   image={images[img2]}
//                 />
//               </Link>
//             </div>
//           )
//         } else {
//           return null
//         }
//       })}
//     </section>
//   )
// }

// export const query = graphql`
//   query {
//     photos: allFile(
//       filter: { relativeDirectory: { eq: "landing-page" } }
//       sort: { fields: base, order: ASC }
//     ) {
//       edges {
//         node {
//           id
//           base
//           childImageSharp {
//             gatsbyImageData(
//               width: 1000
//               quality: 90
//               placeholder: TRACED_SVG
//               tracedSVGOptions: {
//                 color: "#80b5cd"
//                 turdSize: 50
//                 optTolerance: 0.1
//               }
//               formats: [WEBP, AVIF, AUTO]
//             )
//           }
//         }
//       }
//     }
//   }
// `

// 
import React, { useContext, useEffect, useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"
// 
import { collage, collageRow, photo, toCollection } from "./index.module.scss"
import { CursorContext } from "../context/cursor-context"
// 
export default function IndexPage({ data }) {
  const [isMobile, setIsMobile] = useState(false)
  const { cursorOnCollection, cursorDefault } = useContext(CursorContext)
  // 
  useEffect(() => {
    // set breakpoint for JS
    const tabBP = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tablet",
        10
      )
    )
    setIsMobile(window.innerWidth <= tabBP)
  }, [])
// 
  const images = data.photos.edges.map((p) => getImage(p.node))
// 
  return (
    <section className={collage}>
      <div className={collageRow}>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[0]} />
        </div>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[1]} />
          <Link to="/collections">
          </Link>
        </div>
      </div>
      <div className={collageRow}>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[2]} />
        </div>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[3]} />
        </div>
      </div>
      <div className={collageRow}>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[4]} />
        </div>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[5]} />
        </div>
      </div>
      <div className={collageRow}>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[6]} />
        </div>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[7]} />
        </div>
      </div>
      <div className={collageRow}>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[8]} />
        </div>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[9]} />
        </div>
      </div>
      <div className={collageRow}>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage loading="eager" image={images[10]} />
        </div>
        <div 
          className={photo} 
          onMouseOver={() => cursorOnCollection()}
          onMouseLeave={() => cursorDefault()}
        >
          <GatsbyImage
            backgroundPosition={"left"}
            loading="eager"
            image={images[11]}
          />
        </div>
      </div>
    </section>
  )
}
// 
export const query = graphql`
  query {
    photos: allFile(
      filter: { relativeDirectory: { eq: "landing-page" } }
      sort: { fields: base, order: ASC }
    ) {
      edges {
        node {
          id
          base
          childImageSharp {
            gatsbyImageData(
              width: 1000
              quality: 90
              placeholder: TRACED_SVG
              tracedSVGOptions: {
                color: "#80b5cd"
                turdSize: 50
                optTolerance: 0.1
              }
              formats: [WEBP, AVIF, AUTO]
            )
          }
        }
      }
    }
  }
`