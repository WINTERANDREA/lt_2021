import React from 'react'
import CustomHead from './Head'
import Navbar from './Navbar'

const Layout = ({children, vet_name }) => {
  return (
    <>
      <CustomHead />
      <Navbar vet_name={vet_name}/>
      {children}
    </>
  )
}

export default Layout
