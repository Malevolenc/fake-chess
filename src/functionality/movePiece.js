import { Coordinate } from "./CoordinateClass";

export default function movePiece(initialCoords, finalCoords, setChessBoardArray){
    let [iRow,iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

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
    }