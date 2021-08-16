export const menuOpenAnimation = (menuTl, menuOpen) => {
  menuTl
    .to(".mobile-menu", {
      opacity: 1,
    })
    .to(".mobile-menu", {
      duration: 0.3,
      width: "101vw",
      height: `${
        menuOpen ? "calc(100 * var(--mVh))" : "calc(var(--size-input) * 1.2)"
      }`,
      x: 0,
      y: 0,
      opacity: 1,
      borderRadius: 0,
    })
    .to(
      ".close-button",
      {
        opacity: 1,
      },
      "<"
    )
    .to(".menu-content", {
      opacity: 1,
      visibility: "visible",
    })
    .to(".menu-link", {
      stagger: 0.05,
      opacity: 1,
    })
    .to(
      ".mobile-social",
      {
        duration: 0.1,
        yPercent: 0,
      },
      "<"
    )
}

export const menuCloseAnimation = (menuTl, menuOpen) => {
  menuTl
    .to(".mobile-social", {
      duration: 0.1,
      yPercent: 100,
    })
    .to(
      ".menu-link",
      {
        stagger: 0.05,
        opacity: 0,
      },
      "<"
    )
    .to(".mobile-menu", {
      duration: 0.3,
      width: " calc(100% - (var(--space-xl) * 2))",
      height: `${
        menuOpen
          ? "calc(var(--size-input) * 1.2)"
          : "76.8px"
      }`,
      paddingTop: 0,
      x: 20,
      y: 20,
      opacity: 0.95,
      borderRadius: 16,
    })
    .to(".menu-content", {
      opacity: 0,
      visibility: "hidden",
    })
    .to(".mobile-menu", {
      opacity: 0.95,
    })
    .to(
      ".close-button",
      {
        opacity: 0,
      },
      "<"
    )
}

