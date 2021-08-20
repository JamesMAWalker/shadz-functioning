import React from "react"
import { graphql, useStaticQuery } from "gatsby"

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
                <img src="" alt="" />
              </div>
              <div className={`${photo} ${pSecondary}`}>
                <img src="" alt="" />
              </div>
              <div className={`${text} ${tSecondary}`}>
                <p className={textContent}>
                  <b>A high collared coat</b>{" "}
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
              <h4 className={recommendationsTitle}>{shape.title} suggestions</h4>
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
      
    </div>
  )
}

export default FaceShapes
