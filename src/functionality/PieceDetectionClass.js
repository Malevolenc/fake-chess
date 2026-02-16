import { Coordinate } from "./CoordinateClass";
import createMoveObject from "./createMoveObject"

export class PieceDetection{
    // Checks all squares horizontal to a position
    static checkHorizontal(chessBoardArray, iRow, iColumn, currentTurn, moveNumber){
        let moveObjects = []

        // Checks all squares left of the original square
        for (let i = iColumn-1; i >= 0; i--){
            if (chessBoardArray[iRow][i]){
                if (this.checkPieceColour(chessBoardArray[iRow][i]) != currentTurn){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(iRow, i),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][i],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
                    break
                } else{
                    break
                }
            } else{
                moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(iRow, i),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][i],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
            }
        }

        // Checks all squares right of the original square
        for (let i = iColumn+1; i < 8; i++){
            if (chessBoardArray[iRow][i]){
                if (this.checkPieceColour(chessBoardArray[iRow][i]) != currentTurn){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(iRow, i),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][i],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
                    break
                } else{
                    break
                }
            } else{
                moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(iRow, i),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][i],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
            }
        }
        return moveObjects
    }

    // Checks all squares vertical to a position
    static checkVertical(chessBoardArray, iRow,iColumn,currentTurn, moveNumber){
        let moveObjects = []
        let currentPiece = chessBoardArray[iRow][iColumn]

        for (let i = iRow-1; i >= 0; i--){
            if (chessBoardArray[i][iColumn]){
                if (this.checkPieceColour(chessBoardArray[i][iColumn]) != currentTurn){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(i, iColumn),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[i][iColumn],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
                    break
                } else{
                    break
                }
            } else{
                moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(i, iColumn),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[i][iColumn],
                    currentTurn,
                    moveNumber,
                    false,
                        false,
                        false,
                        false
                ))
            }
        }

        for (let i = iRow+1; i < 8; i++){
            if (chessBoardArray[i][iColumn]){
                if (this.checkPieceColour(chessBoardArray[i][iColumn]) != currentTurn){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(i, iColumn),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[i][iColumn],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
                    break
                } else{
                    break
                }
            } else{
                moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(i, iColumn),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[i][iColumn],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        false
                    ))
            }
        }

        // console.log(coords)
        return moveObjects
    }

    // Check all squares diagonal to a position
    static checkDiagonal(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let moveObjects = []
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
                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(row, column),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[row][column],
                            currentTurn,
                            moveNumber,
                            false,
                            false,
                            false,
                            false
                        ))
                        
                        break
                    }
                    else{
                        break
                    }
                }
                moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(row, column),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[row][column],
                    currentTurn,
                    moveNumber
                ))

                row+= dR
                column+=dC
            } 
        }
        return moveObjects
    }

    static checkPieceColour(piece){
        if (piece.toLowerCase() === piece){
            return "black"
        } else if(piece.toLowerCase() !== piece){
            return "white"
        }
    }

}