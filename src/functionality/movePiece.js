import { Coordinate } from "./CoordinateClass";
import updateMoveLogs from "./updateMoveLogs";

export default function movePiece(initialCoords, finalCoords, chessBoardArray, setChessBoardArray, setMoveLogs){
    let [iRow,iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)
    
    let currentPiece = chessBoardArray[iRow][iColumn]
    let capturedPiece;

    if (chessBoardArray[fRow][fColumn]){
        capturedPiece = chessBoardArray[fRow][fColumn]
    }

    setChessBoardArray((prevChessBoardArray)=>{
        let piece = prevChessBoardArray[iRow][iColumn]
            return prevChessBoardArray.map((row, rowIndex)=>{
                if (iRow === rowIndex || fRow === rowIndex){
                    return row.map((item, itemIndex)=>{
                        if (iRow === rowIndex && iColumn === itemIndex){
                            return ""
                        }
                        if (fRow === rowIndex && fColumn === itemIndex){
                            return piece
                        }
                        return item
                    })
                }
                return row
            })
        })

    updateMoveLogs(initialCoords, finalCoords, currentPiece, capturedPiece, setMoveLogs)
    }