import React, { FunctionComponent } from 'react'

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <a href="/">
        Index Page
      </a>

      <br />

      <a href="/about">
        About Page
      </a>

      <br />
      <br />

      {children}
    </>
  )
}