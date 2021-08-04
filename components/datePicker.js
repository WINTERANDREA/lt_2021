import React from 'react';


 const DatePickers = props => {


  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
       <label style={{textTransform:'capitalize'}} htmlFor={props.name}>{props.name}</label>
      <input onChange={props.onChange}  type="date"  required/>
  </div>
  );
}

export default DatePickers