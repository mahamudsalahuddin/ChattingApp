import React from 'react'

const Image = ({imgSrc, className, handleImage}) => {
  return <img onClick={handleImage}  className={className} src={imgSrc} />
}

export default Image