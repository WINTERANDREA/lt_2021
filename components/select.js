import { capitalize } from '@material-ui/core'
import React from 'react'

const Select = props => {
  return (
    <div style={{width: 300, display: 'flex', justifyContent: 'space-between'}}>
      <label style={{textTransform:'capitalize'}} htmlFor={props.name}>{props.name}</label>

      <select onChange={props.onChange}   style={{width: 150}}  name={props.name} id={props.name} required>
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
