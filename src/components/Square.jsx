import "./Square.css"

import Piece from "./Piece"

import checkSquare from "../functionality/checkSquare"
import movePiece from '../functionality/movePiece'
import { Coordinate } from '../functionality/CoordinateClass'
import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"

export default function Square({squareColour, playerColour, currentRowIndex, currentColumnIndex, currentColumnElement}){
    let coordinate = Coordinate.indicesToCoords(currentRowIndex,currentColumnIndex)
    const {
        chessBoardArray, setChessBoardArray,
        currentTurn, setCurrentTurn, 
        currentSquareSelected, setCurrentSquareSelected,
        currentPieceSelected, setCurrentPieceSelected
    } = useContext(GameInformationContext)

    function handleClick(event){
        // Selecting a piece
        if (!currentSquareSelected){
            // Checks if the square has a piece and the user is trying to choose its piece.
            if (checkSquare(event.target.id, chessBoardArray) && event.target.childNodes[0].classList[1] == currentTurn){
                setCurrentSquareSelected(()=>event.target.id)
                let [pieceRow, pieceColumn] = Coordinate.coordsToIndices(event.target.id)
                setCurrentPieceSelected(()=>chessBoardArray[pieceRow][pieceColumn])
            } 
        // Moving a piece
        } else{
            if (event.target.id == currentSquareSelected){
                setCurrentSquareSelected(()=>"")
                setCurrentPieceSelected(()=>"")
            } else if (event.target.id != currentSquareSelected){
                if (movePiece(currentSquareSelected, event.target.id, chessBoardArray, setChessBoardArray, currentPieceSelected, currentTurn)){
                    setCurrentSquareSelected(()=>"")
                    setCurrentPieceSelected(()=>"")
                    setCurrentTurn((prevCurrentTurn)=>prevCurrentTurn=="white"?"black":"white")
                }
            }
        }
    }
    return(
        <div onClick={handleClick} id={`${coordinate}`} className={`chessSquare ${squareColour}Square`}>
            <Piece
            pieceType={`${currentColumnElement}`}/>
        </div>
    )
}