import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { ProductCard } from '../components/product-card'

import {
  collectionsContainer,
  collectionsHeader,
  collection,
  collectionDetail, 
  collectionTitle, 
  collectionBlurb,
  photosGrid,
  photoWrapper,
  innerPhotoWrapper,
  featuredProductsSection,
  featuredHeader,
  featuredProductsGrid,
} from "./collections.module.scss"

const Collections = ({ data: { allFile: { edges: photos }, shopifyCollection } }) => {

  return (
    <section className={collectionsContainer}>
      <h1 className={collectionsHeader}>collections</h1>
      <div className={collection}>
        <div className={collectionDetail}>
          <h2 className={collectionTitle}>summer edit // 2021</h2>
          <article className={collectionBlurb}>
            <p>This summer is all about making up for lost time.</p>
            <br />
            <p>
              Shades of sunlight define the 2021 Summer Edit - quiet morning
              silver, midday vibrant oranges and golds, sunset ambers and warm
              rose hues celebrate the daylight from beginning to end.
            </p>
            <br />
            <p>
              Frames in this collection embrace a spectrum of attitudes - from
              the energetic and angular Shield, to the quiet confidence of the
              Solo - the styles this year pair with all the moods that come
              about through the longest days of the year.
            </p>
            <br />
            <p>
              <em>Summer Edit 2021</em> features six frames, each with several
              color and lens styles.
            </p>
            <br />
            <p>
              Shot by Nishelle Walker in the capital city of endless summers -
              Malibu, CA.
            </p>
          </article>
        </div>
        <div className={photosGrid}>
          {photos.map(({ node: photo }) => {
            const photoData = photo.childImageSharp.gatsbyImageData

            return (
              <div
                key={photo.name}
                className={photoWrapper}
                style={{ gridArea: `${photo.name}` }}
              >
                <GatsbyImage
                  alt={`photo of the ${photo.name} glasses.`}
                  image={photoData}
                  className={innerPhotoWrapper}
                />
              </div>
            )
          })}
        </div>
        <div className={featuredProductsSection}>
          <h3 className={featuredHeader}>Featured in Collection</h3>
          <div className={featuredProductsGrid}>
            {shopifyCollection.products.map((product) => {
              return <ProductCard product={product} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collections

export const collectionQuery = graphql`
  query CollectionQuery {
    allFile(
      filter: { relativeDirectory: { eq: "collections/summer2021" } }
      sort: { fields: base, order: ASC }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              quality: 90
              transformOptions: { fit: COVER }
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
    shopifyCollection(title: { eq: "summer edit // 2021" }) {
      title
      products {
        ...ProductCard
      }
    }
  }
`
