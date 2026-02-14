import { useState, useEffect} from 'react'
import './App.css'

import Chessboard from './ChessBoard'

import FENtoArray from '../functionality/FENtoArray'
import { FENPresets } from '../functionality/FENPresets'

import { GameInformationContext } from '../contexts/GameInformationContext'
import MoveLog from './MoveLog'

import findKing from '../functionality/findKing'
import locatePieces from '../functionality/locatePieces'
import genAllLegalMoves from '../functionality/genAllLegalMoves'
import ResultDisplay from './ResultDisplay'

export default function App() {
  let {emptyBoardFEN, startingBoardFEN, testBoardFEN} = FENPresets

  // chessBoardArrayState[0][0] === h1 & chessBoardArrayState[7][7] = a8 from Top Left to Bottom Right White POV

  const [playerColour, setPlayerColour] = useState("white")
  const [chessBoardArray, setChessBoardArray] = useState(FENtoArray(emptyBoardFEN))
  const [currentTurn, setCurrentTurn] = useState("white")

  const [currentSquareSelected, setCurrentSquareSelected] = useState(null)
  const [currentPieceSelected, setCurrentPieceSelected] = useState("")
  const [currentPieceMoves, setCurrentPieceMoves] = useState([])

  const [whiteKingCoords, setWhiteKingCoords] = useState("")
  const [blackKingCoords, setBlackKingCoords] = useState("")

  const [result, setResult] = useState("")

  // moveLogs[move number][white or black]
  const [moveLogs, setMoveLogs] = useState([[]])

  useEffect(()=>{
      setWhiteKingCoords(()=>findKing("white", chessBoardArray))
      setBlackKingCoords(()=>findKing("black", chessBoardArray))
  }, [chessBoardArray])

  useEffect(()=>{
    let allPieceCoords = locatePieces(currentTurn, chessBoardArray)
    let allLegalMoves;

    if (allPieceCoords.length !== 0 ){
      if (currentTurn == "white"){
        allLegalMoves = genAllLegalMoves(allPieceCoords, chessBoardArray, currentTurn, whiteKingCoords)

        if (allLegalMoves.length == 0){
          setResult(()=>"White has been Checkmated")
        }


    } else if (currentTurn == "black"){
        allLegalMoves = genAllLegalMoves(allPieceCoords, chessBoardArray, currentTurn, blackKingCoords)

        if (allLegalMoves.length == 0){
          setResult(()=>"Black has been Checkmated")
        }
    }
    }

    
  }, [chessBoardArray])

  function clearBoard(){
    setChessBoardArray(()=>FENtoArray(emptyBoardFEN))
    setCurrentTurn(()=>"white")
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
    setMoveLogs(()=>[[]])
    setResult(()=>"")
  }

  function startGame(){
    const newBoard = FENtoArray(startingBoardFEN)
    setWhiteKingCoords(()=>findKing("white", newBoard))
    setBlackKingCoords(()=>findKing("black", newBoard))
    setChessBoardArray(()=>newBoard)
    setPlayerColour(()=>{
      return Math.floor(Math.random()*2) === 0 ? "white" : "black"
    })
    setCurrentTurn(()=>"white")
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
    setMoveLogs(()=>[[]])
    setResult(()=>"")
  }

  function startTest(){
    const newBoard = FENtoArray(testBoardFEN)
    setWhiteKingCoords(()=>findKing("white", newBoard))
    setBlackKingCoords(()=>findKing("black", newBoard))
    setChessBoardArray(()=>newBoard)
    setPlayerColour(()=>{
      return Math.floor(Math.random()*2) === 0 ? "white" : "black"
    })
    setCurrentTurn(()=>"white")
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
    setMoveLogs(()=>[[]])
    setResult(()=>"")
  }

  return (
    <>
    {result && <ResultDisplay resultText={result}/>}
    <GameInformationContext.Provider value={{
      playerColour, setPlayerColour,
      chessBoardArray, setChessBoardArray,
      currentTurn, setCurrentTurn,
      currentSquareSelected, setCurrentSquareSelected,
      currentPieceSelected, setCurrentPieceSelected,
      currentPieceMoves, setCurrentPieceMoves,
      moveLogs, setMoveLogs,
      whiteKingCoords,setWhiteKingCoords,
      blackKingCoords,setBlackKingCoords

    }}>

      <section className='gameInterface'>
        <Chessboard
        key={"Chessboard"}
        />
        
        <article className='informationInterface'>
          <MoveLog
          key={"moveLogsElement"}
          id={"moveLogsElement"}/>
          <button onClick={clearBoard}>Clear Board</button>
          <button onClick={startGame}>Start Game</button>
          <button onClick={startTest}>Start Test</button>
        </article>
        
      </section>
    </GameInformationContext.Provider>

      
      

    </>
      
  )
}
