import React from 'react'

function Errorpage(statusCode, message) {
  return (
    <div>
        <h1>{statusCode}</h1>
        <p>{message}</p>
    </div>
  )
}

export default Errorpage