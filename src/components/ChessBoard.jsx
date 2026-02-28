import Row from "./Row"

import "./ChessBoard.css"
import { useContext, useState, useEffect, useRef } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"
import FENtoArray from "../functionality/FENtoArray";
import { FENPresets } from "../functionality/FENPresets";
import MoveLog from './MoveLog'
import findKing from '../functionality/findKing'
import locatePieces from '../functionality/locatePieces'
import genAllLegalMoves from '../functionality/genAllLegalMoves'
import ResultDisplay from './ResultDisplay';
import { ChessBot } from "../engine/chessBotV1";
import checkSquare from "../functionality/checkSquare"
import { Coordinate } from '../functionality/CoordinateClass'
import movePiece from "../functionality/movePiece"
import genPseudoLegalPieceMoves from "../functionality/genPseudoLegalPieceMoves"
import filterLegalMoves from "../functionality/filterLegalMoves"
import updateGameStates from "../functionality/updateGameStates";
import updateMoveLogs from "../functionality/updateMoveLogs";

// A Chessboard element contains 8 rows
export default function Chessboard(){
    const botRef = useRef(null)

    let {emptyBoardFEN, startingBoardFEN, testBoardFEN} = FENPresets 
    // The player colour is what determines the orientation of the board and the player's colour.
    const [playerColour, setPlayerColour] = useState("white")

    // When the component is first rendered, the chessboard array is empty.
    // chessBoardArray[0][0] = "A8", chessBoardArray[7][7] = "H1"
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
    
    function printBoard(){
        let boardArr = []
        let currentSquareColour = "white"
        for (let i = 0; i < chessBoardArray.length; i++){
            boardArr.push(
                // Each Row Element contains 8 Square elements
                // Props such as row index are passed to give them the proper ids for the file
                <Row
                key={`${i+1} row`}
                startingColour={currentSquareColour}

                currentRowIndex={i}
                currentRowArray={chessBoardArray[i]}
                handleSquareClick={handleSquareClick}
                />
            )
            // Changes the square colour of the first square in a row
            currentSquareColour = currentSquareColour === "white" ? "black" : "white"
        }
        return boardArr // The 0th element represents the 8th Rank, whereas the 7th array corresponds to the 1st Rank
    }

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
            let playerColour = Math.floor(Math.random()*2) === 0 ? "white" : "black"
            let botColour = playerColour == "white" ? "black": "white"

            // ensure the bot instance matches the colour for the new game
            if (botRef.current === null || botRef.current.botColour !== botColour){
                botRef.current = new ChessBot(botColour)
            }
            
            return playerColour
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

    function handleSquareClick(event){
        // Selecting a piece
        if (!currentSquareSelected){
            // Checks if the square has a piece and the user is trying to choose its piece.
            if (checkSquare(event.target.id, chessBoardArray) && event.target.childNodes[0].classList[1] === currentTurn){
                setCurrentSquareSelected(()=>event.target.id)
                let [pieceRow, pieceColumn] = Coordinate.coordsToIndices(event.target.id)

                let pseudoLegalPieceMoves = genPseudoLegalPieceMoves(
                    chessBoardArray[pieceRow][pieceColumn], 
                    chessBoardArray, ...Coordinate.coordsToIndices(event.target.id), 
                    currentTurn, 
                    moveNumber,
                    enPassantTarget,
                    castlingRights
                )

                let legalPieceMoves;

                if (currentTurn == "white"){
                    legalPieceMoves = filterLegalMoves(pseudoLegalPieceMoves, chessBoardArray, whiteKingCoords)

                } else if (currentTurn == "black"){
                    legalPieceMoves = filterLegalMoves(pseudoLegalPieceMoves, chessBoardArray, blackKingCoords)
                }

                setHighlightedPieceMoves(()=>legalPieceMoves.map((move)=>move.finalCoords))
                setCurrentLegalPieceMoves(()=>legalPieceMoves)
                setCurrentPieceSelected(()=>chessBoardArray[pieceRow][pieceColumn])
            } 
        // Moving a piece
        } else{
            // Deselecting the current square
            if (event.target.id === currentSquareSelected){
                setCurrentSquareSelected(()=>"")
                setCurrentPieceSelected(()=>"")
                setHighlightedPieceMoves(()=>[])
            } else if (event.target.id != currentSquareSelected){
                // If the target square is a legal move the piece can make
                if (highlightedPieceMoves.includes(event.target.id)){
                    let {updatedBoard,
                        updatedEnPassantTarget,
                        updatedMoveNumber,
                        moveToLog,
                        updatedCastlingRights
                    } = movePiece(currentSquareSelected, event.target.id, chessBoardArray, currentTurn, moveNumber, currentLegalPieceMoves, castlingRights)
                    updateGameStates(
                        setCurrentSquareSelected, setCurrentPieceSelected, setCurrentLegalPieceMoves, setHighlightedPieceMoves, setCurrentTurn, 
                        setChessBoardArray, updatedBoard,
                        setEnPassantTarget, updatedEnPassantTarget,
                        setMoveNumber, updatedMoveNumber,
                        setCastlingRights, updatedCastlingRights)
                        updateMoveLogs(moveToLog, setMoveLogs)
                }
            }
        }
    }

    useEffect(()=>{
        if (botRef.current !== null){
            if (currentTurn == botRef.current.botColour){
                let botKingCoords = botRef.current.botColour == "white" ? whiteKingCoords : blackKingCoords
                let botDecision = botRef.current.decideMove(chessBoardArray, currentTurn, botKingCoords, moveNumber, enPassantTarget, castlingRights)

                // guard if the bot had no legal moves (decideMove returns null)
                if (!botDecision) return

                let {initialCoords, finalCoords} = botDecision
                
                let {updatedBoard,
                    updatedEnPassantTarget,
                    updatedMoveNumber,
                    moveToLog,
                    updatedCastlingRights
                } = movePiece(initialCoords, finalCoords, chessBoardArray, currentTurn, moveNumber, [botDecision], castlingRights)

                updateGameStates(
                setCurrentSquareSelected, setCurrentPieceSelected, setCurrentLegalPieceMoves, setHighlightedPieceMoves, setCurrentTurn, 
                setChessBoardArray, updatedBoard,
                setEnPassantTarget, updatedEnPassantTarget,
                setMoveNumber, updatedMoveNumber,
                setCastlingRights, updatedCastlingRights)
                updateMoveLogs(moveToLog, setMoveLogs)
            }
        }
    },[chessBoardArray])
    return (
        <>
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
        <section>
            {result && <ResultDisplay resultText={result}/>}
            <article className={`Chessboard ${playerColour}`}>
            {printBoard()}
            </article>
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