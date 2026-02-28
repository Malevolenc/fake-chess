import "./Square.css"

import Piece from "./Piece"

import { Coordinate } from '../functionality/CoordinateClass'
import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"


export default function Square({squareColour, currentRowIndex, currentColumnIndex, currentColumnElement, handleSquareClick}){
    let coordinate = Coordinate.indicesToCoords(currentRowIndex,currentColumnIndex)
    const {
        currentSquareSelected,
        highlightedPieceMoves,

    } = useContext(GameInformationContext)

    return(
        <div 
        onClick={handleSquareClick} 
        id={`${coordinate}`} 
        className={`
            chessSquare
            ${squareColour}Square 
            ${coordinate === currentSquareSelected ? 'squareSelected' : ''}
            ${highlightedPieceMoves.includes(coordinate)? 'availableMoveSquare' : ''}`}>
            <Piece
            pieceType={`${currentColumnElement}`}/>
        </div>
    )
}