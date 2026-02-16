import { Coordinate } from "./CoordinateClass";

export default function simulateMove(chessBoardArray, initialCoords, finalCoords, promotionPiece=""){
    let [iRow, iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

    let tempBoard = chessBoardArray.map(row => row.slice());

    // If a promotionPiece is provided, place that piece on the destination square.
    if (promotionPiece){
        tempBoard[fRow][fColumn] = promotionPiece
    } else {
        tempBoard[fRow][fColumn] = tempBoard[iRow][iColumn]
    }

    tempBoard[iRow][iColumn] = "";

    return tempBoard
}