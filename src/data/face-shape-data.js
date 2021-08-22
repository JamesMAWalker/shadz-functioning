import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';

export const faceShapes = [
  {
    title: "Round Faces",
    mainText: {
      bold: "The typical recommendation",
      content: [
        `for round faces is to find a frame
         with sharper angles and hard straight lines to contrast and balance
         the softer lines of this shape.`,
        `However, this suggestion assumes that facial features on a rounded
         face will also be round and soft in character, when this is very
         often not the case. Rounded faces can have have straight browlines,
         straight and sharp noses, and even angular laugh lines. If this is
         you, then look for a something in the cat-eye family. These frames
         are typically angular towards the edges, and more rounded in the
         center of the design. This will help to give contrast to the outline
         of your face, while also setting off your sharper feature shapes.`,
        `The last element to consider here is how the rest of your look can
         complement your frame choice, and even open up more possibilities
         for your particular face shape.`,
      ],
    },
    secondaryText: {
      bold: "A high collared coat",
      content: [
        `or a wide brimmed hat can offer an added
        set of angles to contrast a rounded feature set. This opens up more
        options for rounded designs that would otherwise not offer enough
        contrast.`,
        `To set off sharper features, choose an outfit that emphasises the
        naturalistic. Organic colors and flowing fabrics are key.`,
      ],
    },
    mImg: <StaticImage src="../images/face-shapes/round-1.png" />,
    sImg: <StaticImage src="../images/face-shapes/round-2.png" />,
    recommendedType: "SQUARE",
  },
  {
    title: "Square Faces",
    mainText: {
      bold: "Square faces",
      content: [
        ` are thougt to be the most distinct of the faces. Their strong lines and geometric shape allow for quite a lot of contrast from other elements. 
        When pairing sunglasses, it is best to follow the common wisdom and choose something rounded and curved - softer facial features typically won’t offset the strong angles of the square shape. However, it’s also important to consider color - a rounded frame in a shade similar to the skin tone will blend rather than contrast the hard lines.
        With more distinct shapes, it’s also important to know what to avoid. For strong shapes like a square jaw, stay away from flat top and sharper cat eye designs, as they can overemphasize these features, or even make them seem out of place by creating awkward angles. `,
        `When pairing sunglasses, it is best to follow the common wisdom and choose something rounded and curved - softer facial features typically won’t offset the strong angles of the square shape. However, it’s also important to consider color - a rounded frame in a shade similar to the skin tone will blend rather than contrast the hard lines.`,
        `With more distinct shapes, it’s also important to know what to avoid. For strong shapes like a square jaw, stay away from flat top and sharper cat eye designs, as they can overemphasize these features, or even make them seem out of place by creating awkward angles. `,
      ],
    },
    secondaryText: {
      bold: "Accessories for this",
      content: [
        `face shape should generally be of a softer, more relaxed style. A flowing dress or anything with a lower cut will bring balance.`,
        ` Or, for a more professional lok you can play up the more modern, angular style with a well cut blazer or similar.`,
      ],
    },
    mImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/square-1.png" />,
    sImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/square-2.png" />,
    recommendedType: "ROUND",
  },
  {
    title: "Oblong Faces",
    mainText: {
      bold: "The oblong shape",
      content: [
        `is characterized mostly by its long length against narrow width. Rounder frame styles can offset this length, but the vertical symmetry of this type makes it work well with most styles. The only caveat is that wider styles should be avoided, as they can emphasize the narrowness of this shape. `,
        `Aside from those basic rules, the oblong face has freedom of experimentation. Don’t forget to consider how your feature shapes will play into your choice; with all the freedom you have, these features can provide a good starting point. `,
        `Cat-eye frames can be a great choice, as they draw attention to the upsweep of the cheek bones, especially if the lower sweep of the frame matches the angle of your cheekbone sweep.`,
      ],
    },
    secondaryText: {
      bold: "Accessories can play",
      content: [
        `a big role with the oblong face. Try a set of eyecatching earrings or add  some volume to your hairstyle. `,
        `In general look for items that horizontally frame the face, especially around the lower portion.`,
      ],
    },
    mImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/oblong-1.png" />,
    sImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/oblong-2.png" />,
    recommendedType: "CATEYE",
  },
  {
    title: "Heart Shaped",
    mainText: {
      bold: "The heart shaped face",
      content: [
        `is widest towards the cheekbones and forehead, and more narrow at the chin and jawline. The common wisdom for this shape is to choose accessories that balance the size difference between the top and bottom portions of the face. `,
        `Because glasses sit between the two hemispheres, they are a great tool for smoothing out the transition between the two. Choosing a rounded frame can de-emphasize forehead width while flowing into the more narrow jawline without looking too wide for everything below the cheekbones. `,
        `Two tone and gradient frames are a great way to emphasize length, as they break the shape into two separate halves. The stronger the contrast the more pronounced this effect is.`,
      ],
    },
    secondaryText: {
      bold: "Adding emphasis to",
      content: [
        `the lower half of the face is one of the easiest ways to balance the heart. Sunglasses that sit lower on the face can do this by obscuring the position of the eyes.`,
        `A light scarf or even a bolder shade of lipstick can also help to draw attention towards the lower part of the face.`,
      ],
    },
    mImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/heart-1.png" />,
    sImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/heart-2.png" />,
    recommendedType: "AVIATOR",
  },
  {
    title: "Oval Faces",
    mainText: {
      bold: "The oval face",
      content: [
        `is similar to the heart, but its width is greatest at the middle of the face, narrowing at both the forehead and chin. This type varies in length to width ratio, but is characterized by vertical balance. This balance means you can play with a lot of different styles, but this also means that the best choice for you is less obvious.`,
        `If your cheekbones are especially prominent you can choose frames that flow into them, mimicing their shape and integrating rather than contrasting them.`,
        `If your face tends towards the longer end of the spectrum then try a style with a more bold and intereting shape. These will provide a point of interest in the center of the face and balance the length.
The classic Clubmaster frame or any half frame design are a great choice for this effect.`,
      ],
    },
    secondaryText: {
      bold: "Because this shape",
      content: [
        ` is so versatile, you’ll want to look to the shape of your features for contrast. Sharper, more mousey features always work well with rounded styles, and of course rounded features will play off of angular styles.`,
      ],
    },
    mImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/oval-1.png" />,
    sImg: <StaticImage objectFit="cover" objectPosition="center" layout="constrained" formats={["auto", "webp"]} placeholder="tracedSVG" src="../images/face-shapes/oval-2.png" />,
    recommendedType: "CLASSIC",
  },
]
