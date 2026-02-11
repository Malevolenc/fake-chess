import { PieceDetection } from "./PieceDetectionClass";
import { Coordinate } from "./CoordinateClass";
import { PieceMovement } from "./PieceMovement";
import checkSquare from "./checkSquare";

export default function movePiece(initialCoords, finalCoords, chessBoardArray, setChessBoardArray, currentPieceSelected, currentTurn){

    let [iRow,iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

    switch (currentPieceSelected.toLowerCase()){
        case "q":
            if (!PieceMovement.queenMovement(chessBoardArray,iRow,iColumn,fRow,fColumn, currentTurn)){
                return false
            }
            break;

        case "r":
            if (!PieceMovement.rookMovement(chessBoardArray,iRow,iColumn,fRow,fColumn, currentTurn)){
                return false
            }
            break;

        case "b":
            if (!PieceMovement.bishopMovement(chessBoardArray,iRow,iColumn,fRow,fColumn, currentTurn)){
                return false
            }
            break;

        case "p":
            if (!PieceMovement.pawnMovement(chessBoardArray,iRow,iColumn,fRow,fColumn, currentTurn)){
                return false
            }
            break;

        case "n":
            if (!PieceMovement.knightMovement(chessBoardArray,iRow,iColumn,fRow,fColumn, currentTurn)){
                return false
            }
            break;

        case "k":
            if (!PieceMovement.kingMovement(chessBoardArray,iRow,iColumn,fRow,fColumn, currentTurn)){
                return false
            }
            break;

    }

    setChessBoardArray((prevChessBoardArray)=>{
        let piece = prevChessBoardArray[iRow][iColumn]
            return prevChessBoardArray.map((row, rowIndex)=>{
                if (iRow == rowIndex || fRow == rowIndex){
                    return row.map((item, itemIndex)=>{
                        if (iRow == rowIndex && iColumn == itemIndex){
                            return ""
                        }
                        if (fRow == rowIndex && fColumn == itemIndex){
                            return piece
                        }
                        return item
                    })
                }
                return row
            })
        })

    return true
    }