import React from 'react'

const Input = ({width,type, name, onChange, label, min, value}) => {
  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
      <label style={{textTransform:'capitalize'}} htmlFor={name}>
        {label}</label>
        <input type={type} name={name} min={min} value={value} onChange={onChange} required/>
    </div>
  )
}



export default Input
