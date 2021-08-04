import { capitalize } from '@material-ui/core'
import React from 'react'

const Select = props => {
  return (
    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
      <label style={{textTransform:'capitalize'}} htmlFor={props.name}>{props.name}</label>

      <select onChange={props.onChange} value={props.value}   name={props.name} id={props.name} required>
        {/* <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option> */}
        {props.children}
      </select>
    </div>
  )
}

export default Select
