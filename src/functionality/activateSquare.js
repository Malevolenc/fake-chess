import { Coordinate } from "./CoordinateClass"

export default function activateSquare(currentSquareSelected){
    for (let row = 7; row >= 0; row--){
        for (let column = 7; column >= 0; column--){
            if (Coordinate.indicesToCoords(row,column) == currentSquareSelected){
                document.getElementById(Coordinate.indicesToCoords(row,column)).classList.add("squareSelected")
            } else{
                document.getElementById(Coordinate.indicesToCoords(row,column)).classList.remove("squareSelected")
            }
        }
    }
}