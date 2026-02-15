import checkSquare from "./checkSquare";
import { Coordinate } from "./CoordinateClass";
import { PieceDetection } from "./PieceDetectionClass";
import createMoveObject from "./createMoveObject";

export class PieceMovement{
    static queenMovement(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let possibleMoves = [
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber),
            ...PieceDetection.checkVertical(chessBoardArray,iRow,iColumn, currentTurn, moveNumber),
            ...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)
        ]

        return possibleMoves
    }

    static rookMovement(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let possibleMoves = [
            ...PieceDetection.checkVertical(chessBoardArray, iRow, iColumn, currentTurn, moveNumber),
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber),
        ]

        return possibleMoves
    }

    static bishopMovement(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let possibleMoves = [...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)]

        return possibleMoves
    }

    static pawnMovement(chessBoardArray, iRow, iColumn, currentTurn, moveNumber){
        let dir = currentTurn === "white" ? -1 : 1
        let moveObjects = []

        let newRow = iRow + dir;

        // Making sure that the newRow is in the bounds of the board
        if (newRow >= 0 && newRow <= 7){
             // One Move Forward
            if (!chessBoardArray[newRow][iColumn]){
                moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(newRow, iColumn),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[newRow][iColumn],
                    currentTurn,
                    moveNumber
                ))


                // Two Moves Forward
                const startingRow = currentTurn === "white" ? 6 : 1

                if (iRow === startingRow){
                    let twoForwardRows = iRow + (dir*2)
                    if (!chessBoardArray[twoForwardRows][iColumn]){
                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(twoForwardRows, iColumn),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[twoForwardRows][iColumn],
                            currentTurn,
                            moveNumber
                        ))
                    }
                }
            }

            // Left Diagonal Captures for pieces not in A-File
            if (iColumn > 0){
                if (chessBoardArray[newRow][iColumn-1] && PieceDetection.checkPieceColour(chessBoardArray[newRow][iColumn-1]) !== currentTurn){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn-1),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[newRow][iColumn-1],
                        currentTurn,
                        moveNumber
                    ))
                }
            }

            // Right Diagonal Captures for pieces not in H-File
            if (iColumn < 7){
                if (chessBoardArray[newRow][iColumn+1] && PieceDetection.checkPieceColour(chessBoardArray[newRow][iColumn+1]) !== currentTurn){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn+1),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[newRow][iColumn+1],
                        currentTurn,
                        moveNumber
                    ))
                }
            }
        }
        
        return moveObjects
    }

    static knightMovement(chessBoardArray, iRow, iColumn, currentTurn, moveNumber){
        let moveObjects = []
        let directions = [
                [-2, -1],       [-2, 1],
        [-1, -2],                       [-1, 2],
        [1, -2],                        [1, 2],
                [2, -1],        [2, 1]
        ]

        for (const [dR, dC] of directions){
            let row = iRow+dR
            let column = iColumn+dC

            if (row >= 0 && row < 8 && column >= 0 && column < 8){
                if (chessBoardArray[row][column]){
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) === currentTurn){
                        continue
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
                
            }
        }

        return moveObjects
    }

    static kingMovement(chessBoardArray, iRow, iColumn, currentTurn, moveNumber){
        let moveObjects = []
        let directions = [
            [-1,-1],[-1,0],[-1,1],
            [0,-1],        [0,1],
            [1,-1],[1,0],[1,1]
        ]

        for (const [dR, dC] of directions){
            let row = iRow+dR
            let column = iColumn+dC

            if (row >= 0 && row < 8 && column >= 0 && column < 8){
                if (chessBoardArray[row][column]){
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) === currentTurn){
                        continue
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
                
            }
        }

        return moveObjects
    }
}