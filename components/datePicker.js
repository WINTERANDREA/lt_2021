import React from 'react';


 const DatePickers = props => {


  return (
    <div style={{width: 300, display: 'flex', justifyContent: 'space-between'}}>
       <label style={{textTransform:'capitalize'}} htmlFor={props.name}>{props.name}</label>
      <input onChange={props.onChange} style={{width: 150}} type="date" required/>
  </div>
  );
}

export default DatePickers