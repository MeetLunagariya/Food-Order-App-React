import React from 'react'

function Input({label,id,type, ...props}) {
  return (
    <p className='control'>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props}/>
    </p>
  )
}

export default Input