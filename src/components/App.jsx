import { useState, useEffect, useContext} from 'react'
import './App.css'

import Chessboard from './ChessBoard'

import FENtoArray from '../functionality/FENtoArray'
import { FENPresets } from '../functionality/FENPresets'

import { GameInformationContext } from '../contexts/GameInformationContext'

export default function App() {
  let {emptyBoardFEN, startingBoardFEN, testBoardFEN} = FENPresets

  // chessBoardArrayState[0][0] === h1 & chessBoardArrayState[7][7] = a8 from Top Left to Bottom Right White POV

  const [playerColour, setPlayerColour] = useState("white")
  const [chessBoardArray, setChessBoardArray] = useState(FENtoArray(emptyBoardFEN))
  const [currentTurn, setCurrentTurn] = useState("white")

  const [currentSquareSelected, setCurrentSquareSelected] = useState(null)
  const [currentPieceSelected, setCurrentPieceSelected] = useState("")
  const [currentPieceMoves, setCurrentPieceMoves] = useState([])

  function clearBoard(){
    setChessBoardArray(()=>FENtoArray(emptyBoardFEN))
    setCurrentTurn(()=>"white")
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
  }

  function startGame(){
    setChessBoardArray(()=>FENtoArray(startingBoardFEN))
    setPlayerColour(()=>{
      return Math.floor(Math.random()*2) === 0 ? "white" : "black"
    })
    setCurrentTurn(()=>"white")
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
  }

  function startTest(){
    setChessBoardArray(()=>FENtoArray(testBoardFEN))
    setPlayerColour(()=>{
      return Math.floor(Math.random()*2) === 0 ? "white" : "black"
    })
    setCurrentTurn(()=>"white")
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
  }

  return (
    <>
    <GameInformationContext.Provider value={{
      playerColour, setPlayerColour,
      chessBoardArray, setChessBoardArray,
      currentTurn, setCurrentTurn,
      currentSquareSelected, setCurrentSquareSelected,
      currentPieceSelected, setCurrentPieceSelected,
      currentPieceMoves, setCurrentPieceMoves

    }}>
      <Chessboard
      key={"Chessboard"}
      />
    </GameInformationContext.Provider>

    
      <button onClick={clearBoard}>Clear Board</button>
      <button onClick={startGame}>Start Game</button>
      <button onClick={startTest}>Start Test</button>

    </>
      
  )
}
