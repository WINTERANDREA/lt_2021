import React from 'react'

const Input = ({width,type, name, onChange, label, min}) => {
  return (
    <div style={{width: 300, display: 'flex', justifyContent: 'space-between'}}>
      <label style={{textTransform:'capitalize'}} htmlFor={name}>
        {label}</label>
        <input style={{width: width || 150}} type={type} name={name} min={min} onChange={onChange} required/>
    </div>
  )
}



export default Input
