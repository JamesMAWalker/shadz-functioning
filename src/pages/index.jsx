import React, { useContext, useEffect, useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"

import { collage, collageRow, photo, toCollection } from "./index.module.scss"
import { CursorContext } from "../context/cursor-context"

export default function IndexPage({ data }) {
  const [isMobile, setIsMobile] = useState(false)
  const { cursorOnCollection, cursorDefault } = useContext(CursorContext)

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

  const images = data.photos.edges.map((p) => getImage(p.node))

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
