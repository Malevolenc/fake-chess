import { Coordinate } from "./CoordinateClass";
import { PieceDetection } from "./PieceDetectionClass";

export default function locatePieces(colour, chessBoardArray){
    let pieceLocations = []
    for (let row = 0; row < chessBoardArray.length; row++){
        for (let column = 0; column < chessBoardArray[row].length; column++){
            if (chessBoardArray[row][column]){
                if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) == colour){
                pieceLocations.push(Coordinate.indicesToCoords(row,column))
                }
            }
            
        }
    }

    return pieceLocations

}