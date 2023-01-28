import React from 'react'
import TextField from '@mui/material/TextField';

const InputBox = ({label, variant, className, type, name, textChange, value}) => {
  return (
    <TextField onChange={textChange} value={value} className={className} label={label} variant={variant} type={type} name={name} />
    
  )
}

export default InputBox