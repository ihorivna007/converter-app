import React from 'react';

const Field = ({ children, ...props}) => {
  console.log(children)
  return (
    <div className="field">
      {children}
    </div>
  )
}

export default Field;