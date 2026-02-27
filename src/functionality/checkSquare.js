import { Coordinate } from "./CoordinateClass"

// Checks if the square is occupied by a piece, if so, return true, else false
export default function checkSquare(squareCoords, chessBoardArray){
    const [row, column] = Coordinate.coordsToIndices(squareCoords)

    if (chessBoardArray[row][column] !== ""){
        return true
    } else{
        return false
    }
}
