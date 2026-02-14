import "./Square.css"

import Piece from "./Piece"

import checkSquare from "../functionality/checkSquare"
import { Coordinate } from '../functionality/CoordinateClass'
import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"
import movePiece from "../functionality/movePiece"
import genPseudoLegalPieceMoves from "../functionality/genPseudoLegalPieceMoves"
import filterLegalMoves from "../functionality/filterLegalMoves"

export default function Square({squareColour, currentRowIndex, currentColumnIndex, currentColumnElement}){
    let coordinate = Coordinate.indicesToCoords(currentRowIndex,currentColumnIndex)
    const {
        chessBoardArray, setChessBoardArray,
        currentTurn, setCurrentTurn, 
        currentSquareSelected, setCurrentSquareSelected,
        currentPieceSelected, setCurrentPieceSelected,
        currentPieceMoves, setCurrentPieceMoves,
        moveLogs, setMoveLogs,
        whiteKingCoords, setWhiteKingCoords,
        blackKingCoords, setBlackKingCoords
    } = useContext(GameInformationContext)

    function handleClick(event){
        // Selecting a piece
        if (!currentSquareSelected){
            // Checks if the square has a piece and the user is trying to choose its piece.
            if (checkSquare(event.target.id, chessBoardArray) && event.target.childNodes[0].classList[1] === currentTurn){
                setCurrentSquareSelected(()=>event.target.id)
                let [pieceRow, pieceColumn] = Coordinate.coordsToIndices(event.target.id)

                let pseudoLegalPieceMoves = genPseudoLegalPieceMoves(chessBoardArray[pieceRow][pieceColumn], chessBoardArray, ...Coordinate.coordsToIndices(event.target.id), currentTurn)
                let legalPieceMoves;



                if (currentTurn == "white"){
                    legalPieceMoves = filterLegalMoves(event.target.id, pseudoLegalPieceMoves, chessBoardArray, whiteKingCoords)

                } else if (currentTurn == "black"){
                    legalPieceMoves = filterLegalMoves(event.target.id, pseudoLegalPieceMoves, chessBoardArray, blackKingCoords)
                }
                
                setCurrentPieceMoves(()=>legalPieceMoves)
                setCurrentPieceSelected(()=>chessBoardArray[pieceRow][pieceColumn])
            } 
        // Moving a piece
        } else{
            // Deselecting the current square
            if (event.target.id === currentSquareSelected){
                setCurrentSquareSelected(()=>"")
                setCurrentPieceSelected(()=>"")
                setCurrentPieceMoves(()=>[])
            } else if (event.target.id != currentSquareSelected){
                // If the target square is a legal move the piece can make
                if (currentPieceMoves.includes(event.target.id)){
                    movePiece(currentSquareSelected, event.target.id, chessBoardArray, setChessBoardArray, setMoveLogs)

                    setCurrentSquareSelected(()=>"")
                    setCurrentPieceSelected(()=>"")
                    setCurrentPieceMoves(()=>[])
                    setCurrentTurn((prevCurrentTurn)=>prevCurrentTurn === "white"?"black":"white")
                }
            }
        }
    }
    return(
        <div 
        onClick={handleClick} 
        id={`${coordinate}`} 
        className={`
            chessSquare
            ${squareColour}Square 
            ${coordinate === currentSquareSelected ? 'squareSelected' : ''}
            ${currentPieceMoves.includes(coordinate)? 'availableMoveSquare' : ''}`}>
            <Piece
            pieceType={`${currentColumnElement}`}/>
        </div>
    )
}