import React from 'react'

function Logo({logo,className = '100px'}) {
  return (
    <div  style={{ border: "1px solid white"}}>
      {logo? <img src={logo} className={`${className}`}alt='blog-logo'/>:<h4>Logo</h4> }
      </div>
  )
}

export default Logo;