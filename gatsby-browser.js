import * as React from "react"
import { StoreProvider } from "./src/context/store-context"
import { CursorProvider } from './src/context/cursor-context';
import { LayoutProvider } from './src/context/layout-context';
import { Auth0Provider } from "@auth0/auth0-react"
import { navigate } from "gatsby"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import fetch from "isomorphic-fetch"
import LogRocket from 'logrocket';

// styles
import "./src/styles/reset.css"
import "./src/styles/variables.css"
import "./src/styles/global.scss"
import { scrollWrap } from './src/layouts/index.module.scss';

const httpLink = new HttpLink({
  uri: "https://sunkissed-heroku-db.herokuapp.com/v1/graphql",
  fetch,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || "/", { replace: true })
}

const onInitialClientRender = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    LogRocket.init("lftncg/shadz-boutique")
  }
}

export const wrapRootElement = ({ element }) => {
  const domain = process.env.GATSBY_AUTH0_DOMAIN
  const clientId = process.env.GATSBY_AUTH0_CLIENTID
  const callback = process.env.GATSBY_AUTH0_CALLBACK

  return (
    <StoreProvider>
      <LayoutProvider>
        <CursorProvider>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={callback}
            onRedirectCallback={onRedirectCallback}
          >
            <ApolloProvider client={client}>{element}</ApolloProvider>
          </Auth0Provider>
        </CursorProvider>
      </LayoutProvider>
    </StoreProvider>
  )
}

// resets scroll position on new location
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  const { pathname } = location
  // list of routes for the scroll-to-top-hook
  const scrollToTopRoutes = [
    `/`,
    `/collections/`,
    `/shopInsta/`,
    `/shop/`,
    `/cart/`,
    `/contact/`,
    `/search/`,
    `/wishlist/`,
  ]
  // if the new route is part of the list above, scroll to top (0, 0)
  if (scrollToTopRoutes.indexOf(pathname) !== -1) {
    window.scrollTo(0, 0)
    const scrollContainer = document.querySelector(`.${scrollWrap}`)
    scrollContainer.scrollTo(0, 0)
  }

  return false
}
