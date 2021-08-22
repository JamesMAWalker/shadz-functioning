import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

// Components
import { ProductCard } from "../components/product-card"

// Data
import { faceShapes } from '../data/face-shape-data';

// Styles
import { title } from "./products/index.module.scss"
import {
  faceShapesContainer,
  faceShapeBlock,
  faceShapeDetails,
  detailsHeader,
  detailsContent,
  picLeft,
  picRight,
  text,
  main as tMain,
  secondary as tSecondary,
  textTitle,
  textContent,
  photo,
  main as pMain,
  secondary as pSecondary,
  recommendationsBlock,
  recommendationsTitle,
  recommendedProductsContainer,
} from "./faceshapes.module.scss"

const FaceShapes = () => {
  const {
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query productsQuery {
      allShopifyProduct {
        nodes {
          productType
          ...ProductCard
        }
      }
    }
  `)

  console.log(faceShapes);

  return (
    <div className={faceShapesContainer}>
      <h1 className={title}>face shapes</h1>
      <div className={faceShapeDetails}>
        <h2 className={detailsHeader}>how to find your frame</h2>
        <p className={detailsContent}>
          There’s no end to the number of face shape guides out there on the
          internet, all of them offering more or less the same four or five
          suggestions. Square jaw? Look for round frames. Round face? Go for
          something angular.
          <br />
          <br />
          While the overall face shape is important to consider, our guide will
          reveal some of the other, often overlooked elements of frame selection
          that go beyond the size of your cheekbones.
          <br />
          <br />
          This step by step guide will start with basic face shapes and then dig
          into other elements like characterstic features and complementary
          style choices.
        </p>
      </div>
      {faceShapes.map((shape, idx) => {
        return (
          <>
            <section
              className={`${faceShapeBlock} ${idx % 2 ? picLeft : picRight}`}
            >
              <div className={`${text} ${tMain}`}>
                <h3 className={textTitle}>{shape.title}</h3>
                <p className={textContent}>
                  <b>{shape.mainText.bold}</b>{" "}
                  {shape.mainText.content.map((block, idx) => (
                    <>
                      <span>{block}</span>
                      <br />
                      <br />
                    </>
                  ))}
                </p>
              </div>
              <div className={`${photo} ${pMain}`}>
                {shape.mImg}
              </div>
              <div className={`${photo} ${pSecondary}`}>
                {shape.sImg}
              </div>
              <div className={`${text} ${tSecondary}`}>
                <p className={textContent}>
                  <b>{shape.secondaryText.bold}</b>{" "}
                  {shape.secondaryText.content.map((block) => (
                    <>
                      <span>{block}</span>
                      <br />
                      <br />
                    </>
                  ))}
                </p>
              </div>
            </section>
            <div className={recommendationsBlock}>
              <h4 className={recommendationsTitle}>
                {shape.title} suggestions
              </h4>
              <div className={recommendedProductsContainer}>
                {products
                  .filter((p) => p.productType === `${shape.recommendedType}`)
                  .slice(0, 3)
                  .map((productInfo) => (
                    <ProductCard product={productInfo} />
                  ))}
              </div>
            </div>
          </>
        )
      })}
      <div className={faceShapeDetails}>
        <h2 className={detailsHeader}>universal style considerations</h2>
        <p className={detailsContent}>
          Faceshape is a helpful starting point, but don’t let it stop you from
          experimenting with styles outside the typical recommendations. The
          most important thing to consider is the vibe you’re going for with
          your overall look. You wouldn’t wear your running glasses to the club,
          no matter how well they fit your face shape!
          <br />
          <br />
          Color is an aspect of sunglasses we don’t often consider closely
          enough. A good starting point is to find out if you have a warmer or
          cooler undertone to your skin. Look at the veins on the underside of
          your wrist: if they appear greenish then you’ve got a warmer
          undertone, if they’re more blue-purple, then your undertone is likely
          cooler. Use this as a point of contrast and choose blues, greens, or
          silver if you’re on the warmer end. Gold, amber, and more rosy hues
          provide good subtle contrast for those with cooler under tones
          <br />
          <br />
          Also consider the practical side of eyewear. If you’re planning for a
          day in the sun, choose a style that will offer more protection, and
          more coverage - darker, oversized frames are your friend. If you know
          you’ll be wearing your glasses all day, choose something frameless,
          lighter weight will help keep you comfortable over long periods.
          <br />
          <br />
          Whatever you do, don’t categorize yourself out of freedom of choice.
          Almost any frame can work on any face given the right set of
          complements. Experiment with all the different choices - there’s no
          better way to find what suits you best.
          <br />
          <br />
          Check out our <Link style={{ color: "var(--primary)"}} to="/collections">collections page</Link> for some inspiration.
        </p>
      </div>
      <div className="extra-padding"></div>
    </div>
  )
}

export default FaceShapes
