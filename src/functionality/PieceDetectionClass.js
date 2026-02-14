import { Coordinate } from "./CoordinateClass";

export class PieceDetection{
    // Checks all squares horizontal to a position
    static checkHorizontal(chessBoardArray, iRow, iColumn, currentTurn){
        let coords = []

        // Checks all squares left of the original square
        for (let i = iColumn-1; i >= 0; i--){
            if (chessBoardArray[iRow][i]){
                if (this.checkPieceColour(chessBoardArray[iRow][i]) != currentTurn){
                    coords.push(Coordinate.indicesToCoords(iRow,i))
                    break
                } else{
                    break
                }
            } else{
                coords.push(Coordinate.indicesToCoords(iRow,i))
            }
        }

        // Checks all squares right of the original square
        for (let i = iColumn+1; i < 8; i++){
            if (chessBoardArray[iRow][i]){
                if (this.checkPieceColour(chessBoardArray[iRow][i]) != currentTurn){
                    coords.push(Coordinate.indicesToCoords(iRow,i))
                    break
                } else{
                    break
                }
            } else{
                coords.push(Coordinate.indicesToCoords(iRow,i))
            }
        }

        // console.log(coords)
        return coords
    }

    // Checks all squares vertical to a position
    static checkVertical(chessBoardArray, iRow,iColumn,currentTurn){
        let coords = []

        for (let i = iRow-1; i >= 0; i--){
            if (chessBoardArray[i][iColumn]){
                if (this.checkPieceColour(chessBoardArray[i][iColumn]) != currentTurn){
                    coords.push(Coordinate.indicesToCoords(i,iColumn))
                    break
                } else{
                    break
                }
            } else{
                coords.push(Coordinate.indicesToCoords(i,iColumn))
            }
        }

        for (let i = iRow+1; i < 8; i++){
            if (chessBoardArray[i][iColumn]){
                if (this.checkPieceColour(chessBoardArray[i][iColumn]) != currentTurn){
                    coords.push(Coordinate.indicesToCoords(i,iColumn))
                    break
                } else{
                    break
                }
            } else{
                coords.push(Coordinate.indicesToCoords(i,iColumn))
            }
        }

        // console.log(coords)
        return coords
    }

    // Check all squares diagonal to a position
    static checkDiagonal(chessBoardArray, iRow,iColumn, currentTurn){
        let coords = []
        let directions = [
            [-1,-1], // Top Left
            [-1, 1], // Top Right
            [1, -1], // Bottom Left
            [1, 1], // Bottom Right
        ]

        for (const [dR, dC] of directions){
            let row = iRow+dR
            let column = iColumn+dC

            while (row >= 0 && row < 8 && column >=0 && column < 8){
                if (chessBoardArray[row][column]){
                    if (this.checkPieceColour(chessBoardArray[row][column]) != currentTurn){
                        coords.push(Coordinate.indicesToCoords(row,column))
                        break
                    }
                    else{
                        break
                    }
                }
                coords.push(Coordinate.indicesToCoords(row,column))

                row+= dR
                column+=dC
            } 
        }
        // console.log(coords)
        return coords
    }

    static checkPieceColour(piece){
        if (piece.toLowerCase() === piece){
            return "black"
        } else if(piece.toLowerCase() !== piece){
            return "white"
        }
    }

}