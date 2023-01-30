import React from 'react'

const Image = ({imgSrc, className, handleGoogleAcc}) => {
  return <img onClick={handleGoogleAcc}  className={className} src={imgSrc} />
}

export default Image