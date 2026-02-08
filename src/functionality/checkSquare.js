import { Coordinate } from "./CoordinateClass"
export default function checkSquare(squareCoords, chessBoardArray){
    const [row, column] = Coordinate.coordsToIndices(squareCoords)

    if (chessBoardArray[row][column] != ""){
        return true
    } else{
        return false
    }
}
