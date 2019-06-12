import React, { FunctionComponent } from 'react'
import { useAmp } from 'next/amp';
import Link from 'next/link'

export const Layout: FunctionComponent = ({ children }) => {
  const isAmp = useAmp()

  return (
    <>
      <a href="/">
        <a>Index Page</a>
      </a>

      <br />

      <a href="/about">
        <a>About Page</a>
      </a>

      <br />

      <a href={`?amp=${Number(!isAmp)}`}>
        {
          isAmp
            ? 'Go to Web Mode'
            : 'Go to AMP Mode'
        }
      </a>

      <br />
      <br />

      {children}
    </>
  )
}