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

  // The player colour is what determines the orientation of the board and the player's colour.
  const [playerColour, setPlayerColour] = useState("white")

  // When the component is first rendered, the chessboard array is empty.
  const [chessBoardArray, setChessBoardArray] = useState(FENtoArray(emptyBoardFEN))
  const [currentTurn, setCurrentTurn] = useState("white")

  const [moveNumber, setMoveNumber] = useState(1)

  const [currentSquareSelected, setCurrentSquareSelected] = useState(null)
  const [currentPieceSelected, setCurrentPieceSelected] = useState("")
  const [currentLegalPieceMoves, setCurrentLegalPieceMoves] = useState([])
  const [highlightedPieceMoves, setHighlightedPieceMoves] = useState([])

  const [whiteKingCoords, setWhiteKingCoords] = useState("")
  const [blackKingCoords, setBlackKingCoords] = useState("")

  const [enPassantTarget, setEnPassantTarget] = useState("")
  const [castlingRights, setCastlingRights] = useState({
    whiteKingSide: true,
    whiteQueenSide: true,
    blackKingSide: true,
    blackQueenSide: true
  })

  const [result, setResult] = useState("")

  // moveLogs[move number][white or black]
  const [moveLogs, setMoveLogs] = useState([])

  // This runs everytime a move is made to locate the kings onn the board for check detection
  useEffect(()=>{
      setWhiteKingCoords(()=>findKing("white", chessBoardArray))
      setBlackKingCoords(()=>findKing("black", chessBoardArray))
  }, [chessBoardArray])

  useEffect(()=>{
    // locatePieces returns an array with the coordinates of all pieces of the same colour
    let allPieceCoords = locatePieces(currentTurn, chessBoardArray)
    let allLegalMoves;
    let lastMove = moveLogs.at(-1)

    // If there are still pieces on the board, check every turn if the game is over by checkmate or stalemate
    if (allPieceCoords.length !== 0){
      if (currentTurn == "white"){
        allLegalMoves = genAllLegalMoves(allPieceCoords, chessBoardArray, currentTurn, whiteKingCoords, moveNumber, enPassantTarget, castlingRights)
        // If a colour's number of legal moves is zero + their king is in check, the current colour loses due to checkmate
        if (allLegalMoves.length == 0 && lastMove.isCheck){
          setResult(()=>"White has been Checkmated")
        } 
        // If a colour's number of legal moves is zero + their king is not in check, the game is a draw due to stalemate
        else if (allLegalMoves.length == 0 && !lastMove.isCheck){
            setResult(()=>"Stalemate")
        }
    }
      else if (currentTurn == "black"){
          allLegalMoves = genAllLegalMoves(allPieceCoords, chessBoardArray, currentTurn, blackKingCoords, moveNumber, enPassantTarget, castlingRights)
          if (allLegalMoves.length == 0 && lastMove.isCheck){
            setResult(()=>"Black has been Checkmated")
          }  else if (allLegalMoves.length == 0 && !lastMove.isCheck){
              setResult(()=>"Stalemate")
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
    setCurrentLegalPieceMoves(()=>[])
    setHighlightedPieceMoves(()=>[])
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
    setMoveLogs(()=>[])
    setCurrentLegalPieceMoves(()=>[])
    setHighlightedPieceMoves(()=>[])
    setResult(()=>"")
    setMoveNumber(()=>1)
    setEnPassantTarget(()=>"")
    setCastlingRights(()=>{
      return {
      whiteKingSide: true,
      whiteQueenSide: true,
      blackKingSide: true,
      blackQueenSide: true
      }}
    )}

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
    setCurrentLegalPieceMoves(()=>[])
    setHighlightedPieceMoves(()=>[])
    setMoveLogs(()=>[])
    setResult(()=>"")
    setMoveNumber(()=>1)
    setEnPassantTarget(()=>"")
    setCastlingRights(()=>{
      return {
      whiteKingSide: true,
      whiteQueenSide: true,
      blackKingSide: true,
      blackQueenSide: true
      }})
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
      currentLegalPieceMoves, setCurrentLegalPieceMoves,
      highlightedPieceMoves, setHighlightedPieceMoves,
      moveLogs, setMoveLogs,
      whiteKingCoords,setWhiteKingCoords,
      blackKingCoords,setBlackKingCoords,
      moveNumber, setMoveNumber,
      enPassantTarget, setEnPassantTarget,
      castlingRights, setCastlingRights

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
          {/* <button onClick={startTest}>Start Test</button> */}
        </article>
        
      </section>
    </GameInformationContext.Provider>

      
      

    </>
      
  )
}
