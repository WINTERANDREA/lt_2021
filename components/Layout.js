import React from 'react'
import CustomHead from './Head'
import Navbar from './Navbar'

const Layout = ({children, vet}) => {
  return (
    <>
      <CustomHead />
      <Navbar vet={vet}/>
      {children}
    </>
  )
}

export default Layout
