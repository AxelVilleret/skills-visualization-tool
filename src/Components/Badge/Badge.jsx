import React from 'react'

function Badge({children}) {
const style = {
    width: "25px",
    height: "25px",
}

  return (
    <div className='position-absolute' style={{ top: -8, right: -8, borderRadius: "500px", backgroundColor: "#1e3a8a", ...style }}>{children}</div>
  )
}

export default Badge