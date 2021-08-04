import React from 'react'
import Image from 'next/image'

const UserImg = ({src}) => {
  return (
    <div className="user-image">
      <Image width={70} height={70} src={src} alt="user image"/>
    </div>
  )
}

export default UserImg
