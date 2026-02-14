import { Coordinate } from "./CoordinateClass";

export default function simulateMove(chessBoardArray, initialCoords, finalCoords){
    let [iRow, iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

    let tempBoard = chessBoardArray.map(row => row.slice());

    tempBoard[fRow][fColumn] = tempBoard[iRow][iColumn] 
    tempBoard[iRow][iColumn] = "";

    return tempBoard
}