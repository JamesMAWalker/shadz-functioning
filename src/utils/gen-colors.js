import React, { useEffect, useState } from "react"

const colors = [
  { name: "black", value: "#000" },
  { name: "tortoise", value: "rgb(140, 72, 33)" },
  { name: "turquoise", value: "rgb(64, 211, 224)" },
  { name: "pink", value: "rgb(238, 167, 178)" },
  { name: "crystal", value: "rgb(215, 234, 241)" },
  { name: "gold", value: "rgb(178, 145, 63)" },
  { name: "silver", value: "rgb(173, 173, 173)" },
  { name: "brown", value: "rgb(149, 59, 7)" },
  { name: "gunmetal", value: "rgb(91, 91, 91)" },
  { name: "rose", value: "rgb(233, 113, 139)" },
  { name: "rosegold", value: "rgb(243, 179, 177)" },
  { name: "amber", value: "rgb(215, 151, 77)" },
  { name: "aqua", value: "rgb(0, 191, 255)" },
  { name: "red", value: "rgb(251, 11, 43)" },
  { name: "blue", value: "rgb(85, 0, 255)" },
  { name: "emerald", value: "rgb(80, 220, 100)" },
  { name: "demi", value: "rgb(215, 234, 241)" },
  { name: "tangerine", value: "rgb(242, 133, 0)" },
  { name: "sunset", value: "rgb(242, 133, 0)" },
  { name: "burgundy", value: "rgb(128, 0, 32)" },
  { name: "smoke", value: "rgb(116, 100, 96)" },
]

// rainbow will be dealt with in component

const colorNames = colors.map((c) => c.name)

export const genColorOptions = (variantTitle) => {
  let swatchColor

  const titleComponents = variantTitle.toLowerCase().split(" ")

  const hasTwoWords = titleComponents.length > 1
  const hasTwoColors = titleComponents.includes("|")

  // get color for a single color keyword
  if (hasTwoWords && !hasTwoColors) {
    const color = titleComponents.filter((word) => {
      return colorNames.includes(word)
    })
    // get both color values
    const colorValue1 =
      colors.filter((c) => c.name === color[0])[0]?.value ?? "#454545"
    const colorValue2 =
      colors.filter((c) => c.name === color[1])[0]?.value ?? "#454545"
    // if tortoise is modifier, set swatch to second color
    if (colorValue1 === "rgb(140, 72, 33)") {
      swatchColor = colorValue2
    } else {
      swatchColor = colorValue1
    }
  }
  // get colors for both color keywords
  if (hasTwoWords && hasTwoColors) {
    const colorsArr = titleComponents.filter((word) => {
      return colorNames.includes(word)
    })

    const colorValues =
      colors
        .filter((c) => colorsArr.includes(c.name))
        .map((filteredColor) => filteredColor.value) ?? "#454545"
    swatchColor = colorValues
  }
  // get color for single color keyword
  if (!hasTwoWords && !hasTwoColors) {
    const color =
      colors.filter((c) => c.name === variantTitle.toLowerCase())[0]?.value ??
      "#454545"
    swatchColor = color
  }

  return swatchColor
}
