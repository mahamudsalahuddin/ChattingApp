import React from 'react'
import {Link} from "react-router-dom"
const AuthenticationLink = ({className, title, href, hrefTitle}) => {
  return (
    <p className={className}>{title}<Link to={href}>{hrefTitle}</Link></p>
  )
}

export default AuthenticationLink