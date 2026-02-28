import { useState, useEffect} from 'react'
import './App.css'

import Chessboard from './ChessBoard'

export default function App() {
  return (
    <>
      <section className='gameInterface'>
        <Chessboard
        key={"Chessboard"}
        />

        {/* <Chessboard
        key={"Chessboard1"}
        /> */}
      </section>

    </>
      
  )
}
