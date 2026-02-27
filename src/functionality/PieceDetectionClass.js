import { Coordinate } from "./CoordinateClass";
import createMoveObject from "./createMoveObject"

export class PieceDetection{
    // Checks all squares horizontal to a position
    static checkHorizontal(chessBoardArray, iRow, iColumn, currentTurn, moveNumber){
        let moveObjects = []

        // Checks all squares left of the original square
        for (let i = iColumn-1; i >= 0; i--){
            if (chessBoardArray[iRow][i]){
                // If the piece on that square is an enemy square, allow movement on that square for capture and break out of loop
                // due to obstruction
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
                        false
                    ))
                    break
                } 
                // This else block executes in the case when the piece on the square is a friendly piece, in that case, break out of
                // loop due to obstruction
                else{
                    break
                }
            } 
            // This else block executes if the square is empty and after, it will move to the next square.
            else{
                moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(iRow, i),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][i],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false
                    ))
            }
        }

        // Checks all squares right of the original square
        for (let i = iColumn+1; i < 8; i++){
            if (chessBoardArray[iRow][i]){
                // If the piece on that square is an enemy square, allow movement on that square for capture and break out of loop
                // due to obstruction
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
                        false
                    ))
                    break
                } 
                // This else block executes in the case when the piece on the square is a friendly piece, in that case, break out of
                // loop due to obstruction
                else{
                    break
                }
            } 
            // This else block executes if the square is empty and after, it will move to the next square.
            else{
                moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(iRow, i),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][i],
                        currentTurn,
                        moveNumber,
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

        // Checks all squares above the original square
        for (let i = iRow-1; i >= 0; i--){
            // If the square is occupied
            if (chessBoardArray[i][iColumn]){
                // If the piece on that square is an enemy square, allow movement on that square for capture and break out of loop
                // due to obstruction
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
                        false
                    ))
                    break
                // This else block executes in the case when the piece on the square is a friendly piece, in that case, break out of
                // loop due to obstruction
                } else{
                    break
                }
            } 
            // This else block executes if the square is empty and after, it will move to the next square.
            else{
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

        // Check all squares below the original square
        for (let i = iRow+1; i < 8; i++){
            if (chessBoardArray[i][iColumn]){
                // If the piece on that square is an enemy square, allow movement on that square for capture and break out of loop
                // due to obstruction
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
                        false
                    ))
                    break
                } 
                // This else block executes in the case when the piece on the square is a friendly piece, in that case, break out of
                // loop due to obstruction
                else{
                    break
                }
            } 
            // This else block executes if the square is empty and after, it will move to the next square.
            else{
                moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(i, iColumn),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[i][iColumn],
                        currentTurn,
                        moveNumber,
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

            // Checks all squares in the current diagonal direction
            while (row >= 0 && row < 8 && column >=0 && column < 8){
                if (chessBoardArray[row][column]){
                    // If the piece on that square is an enemy square, allow movement on that square for capture and break out of loop
                    // due to obstruction
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
                            false
                        ))
                        break
                    }
                    // This else block executes in the case when the piece on the square is a friendly piece, in that case, break out of
                    // loop due to obstruction
                    else{
                        break
                    }
                }
                // This executes if the square is empty and after, it will move to the next square.
                moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(row, column),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[row][column],
                    currentTurn,
                    moveNumber,
                    false,
                    false,
                    false
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