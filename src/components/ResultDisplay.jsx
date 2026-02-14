import React from 'react'
import "./ResultDisplay.css"

export default function ResultDisplay({resultText}) {
  return (
    <div className='resultDisplay'>
      <h1>{resultText}</h1>
    </div>
  )
}
