import React from 'react'
import CustomHead from './Head'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <>
      <CustomHead />
      <Navbar/>
      {children}
    </>
  )
}

export default Layout
