import React from 'react'




const PButton = (props) => {
  return (
     <props.bName variant="contained" disableRipple>
        {props.title}
      </props.bName>
  )
}

export default PButton