import React from 'react'
import './App.css'

import Chessboard from './ChessBoard'

import FENtoArray from '../functionality/FENtoArray'
import { FENPresets } from '../functionality/FENPresets'
import activateSquare from '../functionality/activateSquare'

export default function App() {
  let {emptyBoardFEN, startingBoardFEN, testBoardFEN} = FENPresets

  const playerColourState = React.useState("black")

  // chessBoardArrayState[0][0] == h1 & chessBoardArrayState[7][7] = a8 from Top Left to Bottom Right White POV
  const chessBoardArrayState = React.useState(FENtoArray(emptyBoardFEN))
  const currentTurnState = React.useState("white")
  const currentSquareSelectedState = React.useState("")
  const currentPieceSelectedState = React.useState("")

  const [chessBoardArray, setChessBoardArray] = chessBoardArrayState
  const [currentTurn, setCurrentTurn] = currentTurnState

  const [currentSquareSelected, setCurrentSquareSelected] = currentSquareSelectedState
  const [currentPieceSelected, setCurrentPieceSelected] = currentPieceSelectedState

  React.useEffect(()=>{
    activateSquare(currentSquareSelected)
    }, [currentSquareSelected])

  function clearBoard(){
    chessBoardArrayState[1](()=>FENtoArray(emptyBoardFEN))
    currentTurnState[1](()=>"white")
    currentSquareSelectedState[1](()=>"")
    currentPieceSelectedState[1](()=>"")
  }

  function startGame(){
    chessBoardArrayState[1](()=>FENtoArray(startingBoardFEN))
    playerColourState[1](()=>{
      return Math.floor(Math.random()*2) == 0 ? "white" : "black"
    })
    currentTurnState[1](()=>"white")
    currentSquareSelectedState[1](()=>"")
    currentPieceSelectedState[1](()=>"")
  }

  function startTest(){
    chessBoardArrayState[1](()=>FENtoArray(testBoardFEN))
    playerColourState[1](()=>{
      return Math.floor(Math.random()*2) == 0 ? "white" : "black"
    })
    currentTurnState[1](()=>"white")
    currentSquareSelectedState[1](()=>"")
    currentPieceSelectedState[1](()=>"")
  }

  return (
    <>
      <Chessboard
      key={"Chessboard"}
      playerColour={playerColourState[0]}

      currentTurnState={currentTurnState}
      chessBoardArrayState={chessBoardArrayState}

      currentSquareSelectedState={currentSquareSelectedState}
      currentPieceSelectedState={currentPieceSelectedState}
      />

      <button onClick={clearBoard}>Clear Board</button>
      <button onClick={startGame}>Start Game</button>
      <button onClick={startTest}>Start Test</button>
    </>
      
  )
}
