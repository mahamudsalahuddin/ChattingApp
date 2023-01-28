import React from 'react'




const PButton = (props) => {
  return (
     <props.bName onClick={props.click} variant="contained" disableRipple>
        {props.title}
      </props.bName>
  )
}

export default PButton